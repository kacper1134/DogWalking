import { Box, Button, HStack, Spacer, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fontSize } from "../WalksDimensions";
import LocalizationMap from "./LocalizationMap";
import WalkerScheduler from "./WalkerScheduler";

const AvailabityPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [availabities, setAvailabites] = useState<any[]>([]);
  const [currentRadius, setCurrentRadius] = useState(100);
  const [currentCoordinates, setCurrentCoordinates] = useState({
    lat: 51.065487,
    lng: 17.063,
  });
  const backgroundImageUrl =
  currentStep === 1 ?
    "https://images.unsplash.com/photo-1608370617993-a5c9ee904646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" :
    "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  const toast = useToast();

  const navigate = useNavigate();

  const submitChanges = () => {
    navigate("..");
    toast({
      title: "Saved changes.",
      description: "We've saved your changes for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

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
      {currentStep === 1 && (
        <WalkerScheduler
          availabities={availabities}
          setAvailabites={setAvailabites}
        />
      )}
      {currentStep === 2 && (
        <LocalizationMap
          currentRadius={currentRadius}
          setCurrentRadius={setCurrentRadius}
          currentCoordinates={currentCoordinates}
          setCurrentCoordinates={setCurrentCoordinates}
        />
      )}
      {currentStep === 1 && (
        <NavigationButton
          text="Next"
          onClick={() => setCurrentStep(2)}
          colorScheme="primary"
        />
      )}
      {currentStep === 2 && (
        <NavigationButton
          text="Previous"
          onClick={() => setCurrentStep(1)}
          colorScheme="primary"
        />
      )}
      {currentStep === 2 && (
        <NavigationButton
          text="Confirm"
          onClick={submitChanges}
          colorScheme="green"
        />
      )}
    </Box>
  );
};

interface NavigationButtonProps {
  text: string;
  onClick: () => void;
  colorScheme: string;
}

const NavigationButton = ({
  onClick,
  text,
  colorScheme,
}: NavigationButtonProps) => {
  return (
    <HStack mt="15px">
      <Spacer />
      <Button
        variant="solid"
        colorScheme={colorScheme}
        color="white"
        fontSize={fontSize}
        px="80px"
        onClick={onClick}
      >
        {text}
      </Button>
    </HStack>
  );
};

export default AvailabityPage;
