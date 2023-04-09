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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaBirthdayCake } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import EditImageInput from "../../common/EditImageInput";
import TextEditor from "../../common/TextEditor";
import {
  detailsModalButtonFontSize,
  detailsModalFontSize,
  detailsModalSize,
} from "../UserSection/UserDetailsModalDimensions";
import { DogType } from "./DogCard";

interface DogCreateEditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  changeDogsHandler: (dogInfo: DogType) => void | null;
  id: number;
  name: string;
  birthday: string;
  content: string;
  imageUrl: string | null;
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
}: DogCreateEditModalProps) => {
  const [changedName, setChangedName] = useState(name);
  const [changedBirthday, setChangedBirthday] = useState(birthday);
  const [changedContent, setChangedContent] = useState(content);
  const [changedImageUrl, setChangedImageUrl] = useState(imageUrl);

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [birthdayErrorMessage, setBirthdayErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      clearChanges();
    }
  }, [isOpen]);

  const clearChanges = () => {
    setChangedName(name);
    setChangedBirthday(birthday);
    setChangedContent(content);
    setChangedImageUrl(imageUrl);
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
      changeDogsHandler({
        id: id,
        name: changedName,
        imageUrl: changedImageUrl,
        description: changedContent,
        birthday: changedBirthday,
      });
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
              setImageUrl={setChangedImageUrl}
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
