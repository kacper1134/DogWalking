import {
  Button,
  Card,
  Center,
  Checkbox,
  HStack,
  Select,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { dogFontSize } from "../../Profile/DogSection/DogDimensions";
import { exampleDogs } from "../../Profile/DogSection/DogExampleInfo";
import { fontSize } from "../PlanningDimensions";
import DogSelectionCard from "./DogSelectionCard";
import { Walker } from "./WalkerPage";

interface DogSelectionPageProps {
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setWalkerIndex: React.Dispatch<React.SetStateAction<number>>;
  walker: Walker;
}

const DogSelectionPage = ({
  setCurrentStep,
  setWalkerIndex,
  walker,
}: DogSelectionPageProps) => {
  const dogs = [...exampleDogs];
  const [checkedDogs, setCheckedDogs] = useState(dogs.map((_) => false));

  const allChecked = checkedDogs.every(Boolean);
  const isIndeterminate = checkedDogs.some(Boolean) && !allChecked;

  const availableDates = ["5/2/2023", "5/3/2023", "5/4/2023"];
  const availableHours: { [key: string]: string[] } = {
    "5/2/2023": ["12:30-13:30", "14:30-15:30"],
    "5/3/2023": ["10:30-13:30"],
    "5/4/2023": ["9:30-13:30"],
  };

  const [selectedDay, setSelectedDay] = useState(availableDates[0]);
  const [selectedHour, setSelectedHour] = useState(
    availableHours[selectedDay][0]
  );

  const toast = useToast();
  const navigate = useNavigate();

  const onSubmitHandler = () => {
    console.log(walker);
    console.log(selectedDay);
    console.log(selectedHour);
    const selectedDogs = dogs.filter((_, index) => checkedDogs[index]);
    if (selectedDogs.length === 0) {
      toast({
        title: "Could not save reservation!",
        description: "You must selected at least one dog!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      navigate("..");
      toast({
        title: "Saved reservation.",
        description: "We've saved your reservation for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Center w="100%" minH="70%" flexGrow={10000}>
      <Card w="70%" h="100%" bg="white" pb="50px">
        <VStack p="20px" alignItems="start">
          <HStack>
            <VStack fontSize={dogFontSize} alignItems="start">
              <Text color="primary.700" fontWeight="bold">
                Day
              </Text>
              <Select
                color="white"
                bgColor="primary.600"
                cursor="pointer"
                fontSize={dogFontSize}
                onChange={(e) => {
                  setSelectedDay(e.target.value);
                  setSelectedHour(availableHours[e.target.value][0]);
                }}
              >
                {availableDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
            </VStack>
            <VStack fontSize={dogFontSize} alignItems="start">
              <Text color="primary.700" fontWeight="bold">
                Hour
              </Text>
              <Select
                color="white"
                bgColor="primary.600"
                cursor="pointer"
                fontSize={dogFontSize}
                onChange={(e) => setSelectedHour(e.target.value)}
              >
                {availableHours[selectedDay].map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </Select>
            </VStack>
          </HStack>
          <Checkbox
            colorScheme="primary"
            textColor="primary.600"
            borderColor="primary.600"
            size={{ base: "sm", lg: "md", xl: "lg" }}
            isIndeterminate={isIndeterminate}
            isChecked={allChecked}
            onChange={(e) => setCheckedDogs(dogs.map((_) => e.target.checked))}
            pt="20px"
          >
            Include all
          </Checkbox>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2, "2xl": 3 }} spacing="10px">
          {dogs.map((dog, index) => (
            <DogSelectionCard
              index={index}
              dog={dog}
              key={index}
              setCheckedDogs={setCheckedDogs}
              checkedDogs={checkedDogs}
            />
          ))}
        </SimpleGrid>
        <HStack mt="20px" mr="20px" alignSelf="flex-end">
          <Button
            colorScheme="primary"
            color="white"
            fontSize={fontSize}
            paddingX={1.7 * useBreakpointValue(fontSize)!}
            onClick={() => {
              setCurrentStep(1);
              setWalkerIndex(-1);
            }}
          >
            Previous
          </Button>
          <Button
            colorScheme="green"
            color="white"
            fontSize={fontSize}
            paddingX={1.7 * useBreakpointValue(fontSize)!}
            onClick={() => {
              onSubmitHandler();
            }}
          >
            Confirm
          </Button>
        </HStack>
      </Card>
    </Center>
  );
};

export default DogSelectionPage;
