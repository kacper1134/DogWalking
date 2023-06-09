import { Box, Card, Center, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RadiusSlider from "../AvailabityPage/RadiusSlider";
import "react-datepicker/dist/react-datepicker.css";
import DateRangePicker from "./DateRangePicker";
import BookingMap from "./BookingMap";
import { fontSize, headerFontSize } from "../PlanningDimensions";
import WalkerPage from "./WalkerPage";
import DogSelectionPage from "./DogSelectionPage";
import { useLazyGetWalkersQuery } from "../../../store/walkApiSlice";
import { UserData } from "../../../store/userApiSlice";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const BookingPage = () => {
  const [currentRadius, setCurrentRadius] = useState(100);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentCoordinates, setCurrentCoordinates] = useState({
    lat: 51.065487,
    lng: 17.063,
  });

  const [walkerIndex, setWalkerIndex] = useState(-1);
  const [getWalkersTrigger] = useLazyGetWalkersQuery();
  const [walkers, setWalkers] = useState<UserData[]>([]);
  const username = useSelector((state: RootState) => state.auth.username);
  const [currentStep, setCurrentStep] = useState(1);

  const backgroundImageUrl =
    currentStep === 1
      ? "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      : "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80";

  useEffect(() => {
    const updateWalkers = setTimeout(() => {
      if (
        currentCoordinates !== undefined &&
        currentRadius !== undefined &&
        startDate !== null
      ) {
        var sDate =
          startDate.getFullYear() +
          "-" +
          (startDate.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          startDate.getDate().toString().padStart(2, "0") +
          "T00:00:00";
        var eDate =
          endDate === null
            ? startDate.getFullYear() +
              "-" +
              (startDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              startDate.getDate().toString().padStart(2, "0") +
              "T23:59:00"
            : endDate.getFullYear() +
              "-" +
              (endDate.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              endDate.getDate().toString().padStart(2, "0") +
              "T00:00:00";
              
        getWalkersTrigger({
          lat: currentCoordinates.lat,
          lng: currentCoordinates.lng,
          maximumRange: currentRadius,
          startDate: sDate,
          endDate: eDate,
        }).then((result) => {
          if (result.data !== undefined) {
            setWalkers(result.data.filter(walker => walker.userName !== username));
          }
        });
      }
    }, 200);
    return () => clearTimeout(updateWalkers);
  }, [currentCoordinates, currentRadius, endDate, getWalkersTrigger, startDate, username]);

  return (
    <Box
      flexGrow="10000"
      overflow="hidden"
      minW="100%"
      minH="100%"
      color="black"
      px="5"
      bg="primary.300"
      bgImage={`linear-gradient(90deg, rgba(112,34,221,0.4) 0%, rgba(139,88,225,0.4) 50%, rgba(148,187,233,0.4) 100%), url(${backgroundImageUrl})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <Heading as={Center} py="30px" fontSize={headerFontSize} color="white">
        Book Your Walker
      </Heading>
      {currentStep === 1 && (
        <HStack w="100%" h="100%" flexDirection={{ base: "column", lg: "row" }}>
          <Box w={{ base: "90%", lg: "59%" }} mr="1%" h="90%">
            <BookingMap
              currentCoordinates={currentCoordinates}
              setCurrentCoordinates={setCurrentCoordinates}
              circleRadius={currentRadius}
              walkers={walkers}
              walkerIndex={walkerIndex}
              setWalkerIndex={setWalkerIndex}
            />
          </Box>
          <Box w={{ base: "90%", lg: "40%" }} h="90%">
            <Box minH="20%" maxH="50%" mb="2.5%">
              <RadiusSlider
                currentRadius={currentRadius}
                setCurrentRadius={setCurrentRadius}
                label="Maximum Range"
              />
              <DateRangePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </Box>
            <Card
              minH={{ base: "47.5%", lg: "69%" }}
              maxH={{ base: "55%", lg: "69%" }}
              bg="white"
            >
              {walkerIndex === -1 && (
                <Center>
                  <Heading
                    fontSize={fontSize}
                    textStyle="p"
                    color="black"
                    mt="5%"
                  >
                    Choose Walker From Map!
                  </Heading>
                </Center>
              )}
              {walkerIndex !== -1 && (
                <WalkerPage
                  walkerData={walkers[walkerIndex]}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </Card>
          </Box>
        </HStack>
      )}
      {currentStep === 2 && (
        <DogSelectionPage
          setCurrentStep={setCurrentStep}
          setWalkerIndex={setWalkerIndex}
          walker={walkers[walkerIndex]}
        />
      )}
    </Box>
  );
};

export default BookingPage;
