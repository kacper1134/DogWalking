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
import { AiFillEdit } from "react-icons/ai";
import { useState } from "react";
import DogCreateEditModal from "./DogCreateEditModal";

export interface DogType {
  imageUrl: string;
  name: string;
  age: number;
  description: string;
}

export interface DogCardProps {
  dog: DogType;
}

const DogCard = ({ dog }: DogCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          src={dog.imageUrl}
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
              {dog.age} years old
            </Text>
            <Icon
              as={AiFillEdit}
              fontSize={dogEditButtonSize}
              color="primary.800"
              cursor="pointer"
              ml="20px"
              onClick={() => setIsModalOpen(true)}
            />
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
          <Spacer />
        </VStack>
      </HStack>
      <DogCreateEditModal
        isEdit
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </Card>
  );
};

export default DogCard;
