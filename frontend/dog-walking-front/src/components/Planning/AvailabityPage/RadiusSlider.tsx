import {
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { fontSize } from "../PlanningDimensions";

interface RadiusSliderProps {
  currentRadius: number;
  setCurrentRadius: React.Dispatch<React.SetStateAction<number>>;
  label: string;
}

const RadiusSlider = ({
  currentRadius,
  setCurrentRadius,
  label,
}: RadiusSliderProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <HStack mb="10">
        <Text color="white" fontWeight="bold" w="280px" fontSize={fontSize}>{label}</Text>
      <Slider
        defaultValue={100}
        value={currentRadius}
        min={100}
        max={10000}
        step={100}
        onChange={(value) => setCurrentRadius(value)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderTrack bg="red.100">
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="tomato"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${currentRadius} meters`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </HStack>
  );
};

export default RadiusSlider;
