import {
  Avatar,
  Center,
  HStack,
  Image,
  Card,
  Text,
  Spacer,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGetFirebaseImage from "../../../hooks/useGetFirebaseImage";
import { DogData } from "../../../store/dogsApiSlice";
import { calculateAge } from "../../Profile/DogSection/DogCard";
import {
  dogFontSize,
  dogImageRadius,
} from "../../Profile/DogSection/DogDimensions";
import { dogImageSize } from "../PlanningDimensions";

interface DogSelectionCardProps {
  index: number;
  dog: DogData;
  checkedDogs: boolean[];
  setCheckedDogs: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const DogSelectionCard = ({
  index,
  dog,
  setCheckedDogs,
  checkedDogs,
}: DogSelectionCardProps) => {
  const getImage = useGetFirebaseImage();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (dog.imageUrl !== "" && dog.imageUrl !== "image") {
      getImage(dog.imageUrl)
        .then((url) => setImage(url))
        .catch(() => setImage(""));
    }
  }, [getImage, dog.imageUrl]);
  
  return (
    <Card bg="white" py="20px" px="20px" mx="20px" borderRadius="20px">
      <HStack h="100%">
        <Image
          src={
            image ??
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
        <VStack h="100%">
          <VStack w="100%" px="10px" align="start">
            <Text fontSize={dogFontSize} color="primary.800" textStyle="h2">
              {dog.name}
            </Text>
            <Spacer />
            <Text fontSize={dogFontSize} color="primary.800" textStyle="p">
              {calculateAge(dog.birthday)} years old
            </Text>
          </VStack>
          <Spacer />
          <Checkbox
            colorScheme="primary"
            textColor="primary.600"
            borderColor="primary.600"
            size={{ base: "sm", lg: "md", xl: "lg" }}
            isChecked={checkedDogs[index]}
            onChange={(e) =>
              setCheckedDogs(
                checkedDogs.map((value, i) => {
                  if (i === index) {
                    return !value;
                  }
                  return value;
                })
              )
            }
          >
            include
          </Checkbox>
        </VStack>
      </HStack>
    </Card>
  );
};

export default DogSelectionCard;
