import {
  Center,
  Icon,
  SimpleGrid,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Card from "../../Card";
import {
  borderRadius,
  headingSize,
  iconButtonSize,
  mainMargin,
  mainPadding,
} from "../UserSection/ProfileDetailsDimensions";
import DogCard, { DogType } from "./DogCard";
import DogCreateEditModal from "./DogCreateEditModal";
import { exampleDogs } from "./DogExampleInfo";

const Dogs = () => {
  const columns = useBreakpointValue({
    base: 1,
    md: 2,
    "2xl": 3,
  });

  const [isCreateEditDogModalOpen, setIsCreateEditDogModalOpen] =
    useState(false);

  const [dogs, setDogs] = useState([...exampleDogs]);

  const addNewDogDetails = (dogInfo: DogType) => {
    setDogs((dogs) => {
      dogs.push(dogInfo);
      return dogs;
    });
  };

  const changeDogInfo = (dogInfo: DogType) => {
    setDogs((dogs) => {
      var index = dogs.findIndex((dog) => dog.id === dogInfo.id);
      dogs[index] = dogInfo;
      return [...dogs];
    });
  };

  const deleteDogInfoHandler = (id: number) => {
    setDogs((dogs) => {
      return dogs.filter((dog) => dog.id !== id);
    });
  };

  return (
    <>
      <Center w="100%" bg="white">
        <Text textStyle="h3" color="primary.500" fontSize={headingSize}>
          Dogs
        </Text>
        <Icon
          as={AiFillPlusCircle}
          color="green"
          cursor="pointer"
          fontSize={iconButtonSize}
          ml="20px"
          onClick={() => setIsCreateEditDogModalOpen(true)}
        />
      </Center>
      <Card
        px={mainPadding + "px"}
        py={mainPadding + "px"}
        mx={mainMargin + "px"}
        my={mainMargin + "px"}
        borderRadius={borderRadius}
      >
        {dogs.length === 0 ? (
          <Text
            color="primary.600"
            textStyle="h2"
            fontSize={iconButtonSize}
            w="100%"
            align="center"
          >
            There is nothing here yet!
          </Text>
        ) : (
          <SimpleGrid columns={columns} spacing="8px" justifyItems="center">
            {dogs.map((dog, index) => {
              return (
                <DogCard
                  dog={dog}
                  key={index}
                  changeDogInfo={changeDogInfo}
                  deleteDogInfo={deleteDogInfoHandler}
                />
              );
            })}
          </SimpleGrid>
        )}
        <DogCreateEditModal
          isEdit={false}
          isOpen={isCreateEditDogModalOpen}
          setIsOpen={setIsCreateEditDogModalOpen}
          changeDogsHandler={addNewDogDetails}
          id={dogs.length + 1}
          name=""
          birthday=""
          content=""
          imageUrl={null}
        />
      </Card>
    </>
  );
};

export default Dogs;
