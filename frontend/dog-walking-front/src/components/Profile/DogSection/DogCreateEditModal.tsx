import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaBirthdayCake } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import storage from "../../../config/firebase-config";
import { DogData } from "../../../store/dogsApiSlice";
import EditImageInput from "../../common/EditImageInput";
import TextEditor from "../../common/TextEditor";
import { createGUID } from "../UserSection/UserDetailsEditModal";
import {
  detailsModalButtonFontSize,
  detailsModalFontSize,
  detailsModalSize,
} from "../UserSection/UserDetailsModalDimensions";

interface DogCreateEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  changeDogsHandler: (dogInfo: DogData) => void | null;
  id: number;
  name: string;
  birthday: string;
  content: string;
  imageUrl: string | null;
  walks: [];
}

const DogCreateEditModal = ({
  isOpen,
  setIsOpen,
  isEdit,
  changeDogsHandler,
  id,
  name,
  birthday,
  content,
  imageUrl,
  walks,
}: DogCreateEditModalProps) => {
  const [changedName, setChangedName] = useState(name);
  const [changedBirthday, setChangedBirthday] = useState(
    birthday.split("T")[0]
  );
  const [changedContent, setChangedContent] = useState(content);
  const [changedImageUrl, setChangedImageUrl] = useState(imageUrl ?? "");

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [birthdayErrorMessage, setBirthdayErrorMessage] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      clearChanges();
    }
  }, [isOpen]);

  const clearChanges = () => {
    setChangedName(name);
    setChangedBirthday(birthday.split("T")[0]);
    setChangedContent(content);
    setChangedImageUrl(imageUrl ?? "");
    setNameErrorMessage("");
    setBirthdayErrorMessage("");
  };

  const onSubmitHandler = () => {
    var isInvalid = false;

    if (changedName.length < 2) {
      setNameErrorMessage("Dog name must be at least 2 character long!");
      isInvalid = true;
    } else {
      setNameErrorMessage("");
    }

    if (!changedBirthday) {
      setBirthdayErrorMessage("Dog's birthday is required!");
      isInvalid = true;
    } else {
      setBirthdayErrorMessage("");
    }

    if (!isInvalid) {
      saveImage().then((path) => {
        changeDogsHandler({
          dogId: id,
          name: changedName,
          imageUrl: path ?? "image",
          description: changedContent,
          birthday: changedBirthday,
          walks: walks,
        });
        setIsOpen(false);
      });
    }
  };
  const [picture, setPicture] = useState<File | null>();

  const saveImage = async () => {
    let currentImagePath: string | undefined =
      (imageUrl === null || imageUrl === "image") ? "" : imageUrl!;
    let imagePath: string | undefined = "";

    if (picture && picture !== undefined) {
      imagePath = await createImage();

      if (imagePath === undefined || imagePath === "") {
        return;
      }
      
      if (currentImagePath !== "") {
        await deleteImage(currentImagePath!);
      }
    } else {
      imagePath = currentImagePath;
    }
    return imagePath;
  };

  const createImage = async () => {
    const dogImagePath =
      "dogImages/" + createGUID() + "." + picture?.name.split(".").pop();
    const dogImageRef = ref(storage, dogImagePath);
    const result = await uploadBytes(dogImageRef, picture!).catch(() => {
      toast({
        title: "Dog Update",
        description: "Your dog image size is too big, maximum is 5MB!",
        status: "error",
        isClosable: true,
      });
      setIsOpen(false);
      return undefined;
    });
    if (result === undefined) return undefined;
    return dogImagePath;
  };

  const deleteImage = async (currentDogImagePath: string) => {
    const dogImageRef = ref(storage, currentDogImagePath);
    deleteObject(dogImageRef)
      .then(() => setChangedImageUrl(""))
      .catch(() => {});
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
      <ModalContent bgColor="primary.700">
        <ModalHeader textStyle="p" roundedTop="lg">
          {isEdit ? "Edit" : "Create"} dog data
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid pb="30px" columns={{ sm: 1, md: 2 }}>
            <InputElement
              label="Name"
              placeholder="Name"
              icon={GiSittingDog}
              value={changedName}
              setValue={setChangedName}
              errorMessage={nameErrorMessage}
              type="text"
            />
            <InputElement
              label="Birthday"
              placeholder="Birthday"
              icon={FaBirthdayCake}
              value={changedBirthday}
              setValue={setChangedBirthday}
              errorMessage={birthdayErrorMessage}
              type="date"
            />
          </SimpleGrid>
          <Flex as={Center} pb="30px" direction={{ base: "column", md: "row" }}>
            <EditImageInput
              inititalPictureUrl={changedImageUrl ?? ""}
              setPicture={setPicture}
              picture={null}
            />
            <FormControl alignSelf="start">
              <FormLabel
                fontSize={detailsModalFontSize}
                textStyle="p"
                fontWeight="bold"
              >
                About dog
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
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  icon: IconType;
  errorMessage: string;
  type: string;
}

const getToday = () => {
  const today = new Date(Date.now());
  const day = today.getDate().toString().padStart(2, "0");
  const month = today.getMonth().toString().padStart(2, "0");
  const year = today.getFullYear().toString();
  return year + "-" + month + "-" + day;
};

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
          max={getToday()}
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

export default DogCreateEditModal;
