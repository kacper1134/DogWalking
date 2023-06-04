import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Center,
  Select,
  ModalFooter,
  Button,
  FormHelperText,
  SimpleGrid,
  Flex,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillPhone } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import storage from "../../../config/firebase-config";
import {
  RegisterUserFields,
  useUpdateUserDetailsMutation,
} from "../../../store/userApiSlice";
import {
  getErrorMessageForEmail,
  getErrorMessageForFirstName,
  getErrorMessageForLastName,
  getErrorMessageForPhoneNumber,
  getErrorMessageForRatePerHours,
} from "../../Auth/Register/RegisterFormErrorMessageFunctions";
import EditImageInput from "../../common/EditImageInput";
import TextEditor from "../../common/TextEditor";
import {
  detailsModalButtonFontSize,
  detailsModalFontSize,
  detailsModalSize,
} from "./UserDetailsModalDimensions";

interface UserDetailsEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setPictureUrl: React.Dispatch<React.SetStateAction<string>>;
  picture: File | null | undefined;
  setPicture: React.Dispatch<React.SetStateAction<File | null | undefined>>;
  inititalPictureUrl: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  gender: "Male" | "Female";
  setGender: React.Dispatch<React.SetStateAction<"Male" | "Female">>;
  ratePerHour: number;
  setRatePerHour: React.Dispatch<React.SetStateAction<number>>;
  userData: RegisterUserFields;
}

export interface UserDetailsType {
  name: string;
  surname: string;
  imageUrl: string | null;
  description: string | "Not Provided";
  ratePerHour: number;
  username: string;
  gender: "Male" | "Female";
  email: string;
  phoneNumber: string | "Not Provided";
}

const GenderSelectElementData = {
  label: "Gender",
  placeholder: "Select gender",
  options: ["Male", "Female"],
};

export const createGUID = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substring(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
};

const UserDetailsEditModal = ({
  isOpen,
  setIsOpen,
  content,
  setContent,
  picture,
  setPicture,
  inititalPictureUrl,
  setPictureUrl,
  name,
  setName,
  surname,
  setSurname,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  gender,
  setGender,
  ratePerHour,
  setRatePerHour,
  userData,
}: UserDetailsEditModalProps) => {
  const [changedName, setChangedName] = useState(name);
  const [changedContent, setChangedContent] = useState(content);
  const [changedSurname, setChangedSurname] = useState(surname);
  const [changedGender, setChangedGender] = useState(gender);
  const [changedEmail, setChangedEmail] = useState(email);
  const [changedPhoneNumber, setChangedPhoneNumber] = useState(phoneNumber);
  const [changedImageUrl, setChangedImageUrl] = useState(inititalPictureUrl);
  const [changedRatePerHour, setChangedRatePerHour] = useState(ratePerHour);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [ratePerHourErrorMessage, setRatePerHourErrorMessage] = useState("");

  const [updateUserDetails] = useUpdateUserDetailsMutation();
  const toast = useToast();
  
  useEffect(() => {
    if (isOpen) {
      clearChanges();
    }
  }, [isOpen]);

  const clearChanges = () => {
    setChangedName(name);
    setChangedContent(content);
    setChangedSurname(surname);
    setChangedGender(gender);
    setChangedPhoneNumber(phoneNumber);
    setChangedEmail(email);
    setChangedRatePerHour(ratePerHour);
    setChangedImageUrl("");
    setFirstNameErrorMessage("");
    setLastNameErrorMessage("");
    setEmailErrorMessage("");
    setPhoneNumberErrorMessage("");
    setRatePerHourErrorMessage("");
    setPictureUrl("");
  };

  const onSubmitHandler = () => {
    var isInvalid = false;

    const firstNameErrorMessage = getErrorMessageForFirstName(changedName);
    setFirstNameErrorMessage(firstNameErrorMessage);
    if (firstNameErrorMessage !== "") {
      isInvalid = true;
    }

    const lastNameErrorMessage = getErrorMessageForLastName(changedSurname);
    setLastNameErrorMessage(lastNameErrorMessage);
    if (lastNameErrorMessage !== "") {
      isInvalid = true;
    }

    const emailErrorMessage = getErrorMessageForEmail(changedEmail);
    setEmailErrorMessage(emailErrorMessage);
    if (emailErrorMessage !== "") {
      isInvalid = true;
    }

    const phoneNumberErrorMessage =
      getErrorMessageForPhoneNumber(changedPhoneNumber);
    setPhoneNumberErrorMessage(phoneNumberErrorMessage);
    if (phoneNumberErrorMessage !== "") {
      isInvalid = true;
    }

    const ratePerHourErrorMessage =
      getErrorMessageForRatePerHours(changedRatePerHour);
    setRatePerHourErrorMessage(ratePerHourErrorMessage);
    if (ratePerHourErrorMessage !== "") {
      isInvalid = true;
    }

    saveImage().then((path) => {
      if (!isInvalid) {
        const oldData = { ...userData };
        oldData.FirstName = changedName;
        oldData.LastName = changedSurname;
        oldData.Description = changedContent;
        oldData.Gender = changedGender === "Male" ? 0 : 1;
        oldData.Email = changedEmail;
        oldData.PhoneNumber = changedPhoneNumber;
        oldData.ImageUrl = path ?? inititalPictureUrl;
        oldData.RatePerHour = changedRatePerHour;
        
        updateUserDetails(oldData).then((result) => {
          if ("error" in result) {
            toast({
              title: "Update Account",
              description: "Could not update user details",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Update Account",
              description: "Updated successfully",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            setName(changedName);
            setSurname(changedSurname);
            setContent(changedContent);
            setGender(changedGender);
            setEmail(changedEmail);
            setPhoneNumber(changedPhoneNumber);
            setPictureUrl(path!);
            setRatePerHour(Math.max(changedRatePerHour, 0));
            setIsOpen(false);
          }
        });
      }
    });
  };

  const saveImage = async () => {
    let currentImageProfilePath: string | undefined = userData?.ImageUrl;
    let profilePath: string | undefined = "";
    
    if (picture && picture !== undefined) {
      profilePath = await createImage();
      
      if (profilePath === undefined || profilePath === "") {
        return;
      }
      
      if (currentImageProfilePath !== "") {
        await deleteImage(currentImageProfilePath!);
      }
    } else {
      profilePath = currentImageProfilePath;
    }
    return profilePath;
  };

  const createImage = async () => {
    const profileImagePath =
      "userImages/" + createGUID() + "." + picture?.name.split(".").pop();
    const profileImageRef = ref(storage, profileImagePath);
    const result = await uploadBytes(profileImageRef, picture!).catch(() => {
      toast({
        title: "Update Account",
        description: "Your profile image size is too big, maximum is 5MB!",
        status: "error",
        isClosable: true,
      });
      setIsOpen(false);
      return undefined;
    });
    if (result === undefined) return undefined;
    return profileImagePath;
  };

  const deleteImage = async (currentImageProfilePath: string) => {
    const profileImageRef = ref(storage, currentImageProfilePath);
    deleteObject(profileImageRef).then(() => setPictureUrl("")).catch(() => {});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      closeOnOverlayClick={false}
      size={detailsModalSize}
      blockScrollOnMount={false}
      scrollBehavior="inside"
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent backgroundColor="primary.700">
        <ModalHeader textStyle="p" roundedTop="lg">
          Edit user details
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid pb="30px" columns={{ sm: 1, md: 2 }}>
            <InputElement
              label="First Name"
              placeholder="First Name"
              icon={FaUserCircle}
              value={changedName}
              setValue={setChangedName}
              errorMessage={firstNameErrorMessage}
              type="text"
            />
            <InputElement
              label="Last Name"
              placeholder="Last Name"
              icon={RiUserFill}
              value={changedSurname}
              setValue={setChangedSurname}
              errorMessage={lastNameErrorMessage}
              type="text"
            />
          </SimpleGrid>
          <SimpleGrid pb="30px" columns={{ sm: 1, md: 2 }}>
            <InputElement
              label="Email Address"
              placeholder="Email Address"
              value={changedEmail}
              setValue={setChangedEmail}
              icon={MdEmail}
              errorMessage={emailErrorMessage}
              type="text"
            />
            <InputElement
              label="Phone Number"
              placeholder="Phone Number"
              value={changedPhoneNumber}
              setValue={setChangedPhoneNumber}
              icon={AiFillPhone}
              errorMessage={phoneNumberErrorMessage}
              type="text"
            />
          </SimpleGrid>
          <SimpleGrid pb="30px" columns={{ sm: 1, md: 2 }}>
            <SelectElement
              label={GenderSelectElementData.label}
              placeholder={GenderSelectElementData.placeholder}
              options={GenderSelectElementData.options}
              gender={changedGender}
              setGender={setChangedGender}
            />
            <InputElement
              label="Rate Per Hour"
              placeholder="Rate Per Hour"
              icon={TbPigMoney}
              value={changedRatePerHour}
              setValue={setChangedRatePerHour}
              errorMessage={ratePerHourErrorMessage}
              type="number"
            />
          </SimpleGrid>
          <Flex as={Center} pb="30px" direction={{ base: "column", md: "row" }}>
            <EditImageInput
              inititalPictureUrl={inititalPictureUrl}
              setPicture={setPicture}
              picture={picture}
            />
            <FormControl alignSelf="start">
              <FormLabel
                fontSize={detailsModalFontSize}
                textStyle="p"
                fontWeight="bold"
              >
                About me
              </FormLabel>
              <TextEditor
                content={changedContent}
                setContent={setChangedContent}
                fontSize={useBreakpointValue(detailsModalFontSize)!}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            textStyle="p"
            colorScheme="primary"
            mr={3}
            onClick={onSubmitHandler}
            fontSize={detailsModalButtonFontSize}
          >
            Confirm
          </Button>
          <Button
            textStyle="p"
            colorScheme="gray"
            onClick={() => setIsOpen(false)}
            fontSize={detailsModalButtonFontSize}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface InputElementProps {
  label: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  placeholder: string;
  icon: IconType;
  errorMessage: string;
  type: "number" | "text";
}

const InputElement = ({
  label,
  value,
  setValue,
  placeholder,
  icon,
  errorMessage,
  type,
}: InputElementProps) => {
  return (
    <FormControl textStyle="p" w="95%">
      <FormLabel fontSize={detailsModalFontSize} fontWeight="bold">
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement fontSize={detailsModalFontSize}>
          <Icon as={icon} />
        </InputLeftElement>
        <Input
          isInvalid={errorMessage !== ""}
          pr="4.5rem"
          type={type}
          placeholder={placeholder}
          variant="filled"
          onChange={(e) => setValue(e.target.value)}
          fontSize={detailsModalFontSize}
          value={value}
        />
      </InputGroup>
      <FormHelperText
        textStyle="p"
        color="secondary.400"
        fontSize={detailsModalFontSize}
      >
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};

interface SelectElementProps {
  label: string;
  placeholder: string;
  options: string[];
  gender: "Male" | "Female";
  setGender: React.Dispatch<React.SetStateAction<"Male" | "Female">>;
}

const SelectElement = ({
  label,
  placeholder,
  options,
  gender,
  setGender,
}: SelectElementProps) => {
  return (
    <FormControl alignSelf="start" pb="30px" textStyle="p" w="95%">
      <FormLabel fontSize={detailsModalFontSize} fontWeight="bold">
        {label}
      </FormLabel>
      <Select
        placeholder={placeholder}
        onChange={(e: any) => setGender(e.target.value)}
        value={gender ?? ""}
        fontSize={detailsModalFontSize}
      >
        {options.map((option, index) => {
          return <option key={index}>{option}</option>;
        })}
      </Select>
    </FormControl>
  );
};

export default UserDetailsEditModal;
