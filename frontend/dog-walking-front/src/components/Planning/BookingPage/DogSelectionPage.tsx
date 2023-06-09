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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../store";
import { DogData } from "../../../store/dogsApiSlice";
import { useGetUserQuery, UserData } from "../../../store/userApiSlice";
import { useCreateWalkMutation } from "../../../store/walkApiSlice";
import { dogFontSize } from "../../Profile/DogSection/DogDimensions";
import { fontSize } from "../PlanningDimensions";
import DogSelectionCard from "./DogSelectionCard";

interface DogSelectionPageProps {
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  setWalkerIndex: React.Dispatch<React.SetStateAction<number>>;
  walker: UserData;
}

const getAvailableDatesFromAvailabilities = (walker: UserData): string[] => {
  const availabilties = walker.availabilities;
  const dates = new Set<string>();
  availabilties.forEach((a) => dates.add(a.startTime.split("T")[0]));

  return Array.from(dates);
};

const getAvailableHoursFromAvailabilities = (
  walker: UserData
): Map<string, string[]> => {
  const availabilties = walker.availabilities;
  const days = getAvailableDatesFromAvailabilities(walker);
  const hours = new Map<string, Array<string>>();

  days.forEach((day) => hours.set(day, []));
  availabilties.forEach((a) =>
    hours
      .get(a.startTime.split("T")[0])!
      .push(
        a.startTime.split("T")[1].split(":").splice(0, 2).join(":") +
          "-" +
          a.endTime.split("T")[1].split(":").splice(0, 2).join(":")
      )
  );

  return hours;
};

const DogSelectionPage = ({
  setCurrentStep,
  setWalkerIndex,
  walker,
}: DogSelectionPageProps) => {
  const username = useSelector((state: RootState) => state.auth.username);
  const { data: details } = useGetUserQuery(username);
  const [dogs, setDogs] = useState<DogData[]>([]);

  useEffect(() => {
    if (details != null) {
      setDogs([...details.dogs]);
    }
  }, [details]);

  const [checkedDogs, setCheckedDogs] = useState(dogs.map((_) => false));

  const allChecked =
    checkedDogs.length === 0 ? false : checkedDogs.every(Boolean);

  const isIndeterminate = checkedDogs.some(Boolean) && !allChecked;

  const availableDates = getAvailableDatesFromAvailabilities(walker);

  const availableHours: Map<string, string[]> =
    getAvailableHoursFromAvailabilities(walker);

  const [selectedDay, setSelectedDay] = useState(availableDates[0]);
  const [selectedHour, setSelectedHour] = useState(
    availableHours.get(selectedDay)![0]
  );

  const toast = useToast();
  const navigate = useNavigate();

  const [createWalkMutation] = useCreateWalkMutation();

  const onSubmitHandler = () => {
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
      createWalkMutation({
        ownerUsername: username,
        day: selectedDay + "T00:00:00",
        hourRange: selectedHour,
        dogIds: details?.dogs.map((d) => d.dogId)!,
        walkerId: walker.userId,
      }).then(() => {
        navigate("..");
        toast({
          title: "Saved reservation.",
          description: "We've saved your reservation for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
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
                  setSelectedHour(availableHours.get(e.target.value)![0]);
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
                {availableHours.get(selectedDay)!.map((hour, index) => (
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
