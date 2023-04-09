import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { DogType } from "./DogCard";

interface DogDeleteModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dogInfo: DogType;
  deleteDogInfo: (id: number) => void;
}

const DogDeleteModal = ({
  isOpen,
  setIsOpen,
  dogInfo,
  deleteDogInfo,
}: DogDeleteModalProps) => {
  const onSubmit = () => {
    deleteDogInfo(dogInfo.id);
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent bgColor="primary.700">
        <ModalHeader>Delete dog info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete info about dog {dogInfo.name}?
          </Text>
          <Text as="sub">Please note that this action is irreversible!</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="primary" onClick={() => onSubmit()} mr={3}>
            Confirm
          </Button>
          <Button colorScheme="gray" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DogDeleteModal;
