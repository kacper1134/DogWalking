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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillPhone } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
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
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
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
  options: ["Male", "Female", "Other", "Prefer not to disclose"],
};

const UserDetailsEditModal = ({
  isOpen,
  setIsOpen,
  content,
  setContent,
  imageUrl,
  setImageUrl,
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
}: UserDetailsEditModalProps) => {
  const [changedName, setChangedName] = useState(name);
  const [changedContent, setChangedContent] = useState(content);
  const [changedSurname, setChangedSurname] = useState(surname);
  const [changedGender, setChangedGender] = useState(gender);
  const [changedEmail, setChangedEmail] = useState(email);
  const [changedPhoneNumber, setChangedPhoneNumber] = useState(phoneNumber);
  const [changedImageUrl, setChangedImageUrl] = useState(imageUrl);
  const [changedRatePerHour, setChangedRatePerHour] = useState(ratePerHour);

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [ratePerHourErrorMessage, setRatePerHourErrorMessage] = useState("");

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
    setChangedImageUrl(imageUrl);
    setChangedEmail(email);
    setChangedRatePerHour(ratePerHour);
    setFirstNameErrorMessage("");
    setLastNameErrorMessage("");
    setEmailErrorMessage("");
    setPhoneNumberErrorMessage("");
    setRatePerHourErrorMessage("");
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

    if (!isInvalid) {
      setName(changedName);
      setSurname(changedSurname);
      setContent(changedContent);
      setGender(changedGender);
      setEmail(changedEmail);
      setPhoneNumber(changedPhoneNumber);
      setImageUrl(changedImageUrl);
      setRatePerHour(Math.max(changedRatePerHour, 0));
      setIsOpen(false);
    }
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
              inititalPictureUrl={changedImageUrl ?? ""}
              setImageUrl={setChangedImageUrl}
              picture={null}
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
