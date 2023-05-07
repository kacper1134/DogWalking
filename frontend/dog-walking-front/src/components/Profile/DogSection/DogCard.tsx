import {
  Avatar,
  Center,
  Image,
  VStack,
  Text,
  HStack,
  Box,
  useBreakpointValue,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import {
  dogCardDescriptionWidth,
  dogCardWidth,
  dogEditButtonSize,
  dogFontSize,
  dogImageRadius,
  dogImageSize,
} from "./DogDimensions";
import parse from "html-react-parser";
import Card from "../../Card";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import DogCreateEditModal from "./DogCreateEditModal";
import DogDeleteModal from "./DogDeleteModal";

export interface DogType {
  id: number;
  imageUrl: string | null;
  name: string;
  birthday: string;
  description: string;
}

export interface DogCardProps {
  dog: DogType;
  changeDogInfo: (dogInfo: DogType) => void;
  deleteDogInfo: (id: number) => void;
}

export const calculateAge = (birthday: string) => {
  var ageDifMs = Date.now() - new Date(birthday).getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const DogCard = ({ dog, changeDogInfo, deleteDogInfo }: DogCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  return (
    <Card
      height={useBreakpointValue(dogImageSize)}
      width={useBreakpointValue(dogCardWidth)}
      py="20px"
      px="20px"
      mx="20px"
      borderRadius="20px"
    >
      <HStack h="100%">
        <Image
          src={
            dog.imageUrl ??
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          w={dogImageSize}
          h={dogImageSize}
          objectFit="cover"
          objectPosition="top"
          borderRadius={dogImageRadius}
          fallback={
            <Center h="100%">
              <Avatar size="xl" />
            </Center>
          }
        />
        <VStack h="100%" w={dogCardDescriptionWidth}>
          <HStack w="100%" px="10px">
            <Text fontSize={dogFontSize} color="primary.800" textStyle="h2">
              {dog.name}
            </Text>
            <Spacer />
            <Text fontSize={dogFontSize} color="primary.800" textStyle="p">
              {calculateAge(dog.birthday)} years old
            </Text>
            <VStack w="15px">
              <Icon
                as={AiFillEdit}
                alignSelf="end"
                fontSize={dogEditButtonSize}
                color="orange"
                cursor="pointer"
                ml="20px"
                onClick={() => setIsModalOpen(true)}
              />
              <Icon
                as={AiFillDelete}
                fontSize={dogEditButtonSize}
                alignSelf="end"
                color="red"
                cursor="pointer"
                ml="20px"
                onClick={() => setIsCloseModalOpen(true)}
              />
            </VStack>
          </HStack>
          <Box
            textStyle="p"
            fontSize={dogFontSize}
            maxH={dogImageSize}
            px="10px"
            color="gray.500"
            alignSelf="start"
            overflowY="scroll"
          >
            {parse(dog.description)}
          </Box>
        </VStack>
      </HStack>

      <DogCreateEditModal
        isEdit
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        changeDogsHandler={changeDogInfo}
        id={dog.id}
        name={dog.name}
        birthday={dog.birthday}
        content={dog.description}
        imageUrl={dog.imageUrl}
      />
      <DogDeleteModal
        dogInfo={dog}
        isOpen={isCloseModalOpen}
        setIsOpen={setIsCloseModalOpen}
        deleteDogInfo={deleteDogInfo}
      />
    </Card>
  );
};

export default DogCard;
