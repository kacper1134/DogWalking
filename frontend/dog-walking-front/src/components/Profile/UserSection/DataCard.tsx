import Card from "../../Card";
import { Text, SimpleGrid, VStack, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { dogCardDescriptionWidth } from "../DogSection/DogDimensions";

export interface Data {
  label: string;
  value: string;
}

export interface DataCardProps {
  height: string;
  width: string;
  borderRadius: string;
  fontSize: number;
  title: string;
  properties: Data[];
}

const DataCard: React.FC<DataCardProps> = ({
  height,
  width,
  borderRadius,
  fontSize,
  title,
  properties,
}) => {
  return (
    <Card width={width} height={height} borderRadius={borderRadius}>
      <VStack p="15px">
        <Text
          textStyle="h2"
          fontSize={`${fontSize - 2}px`}
          color="primary.800"
          alignSelf="start"
        >
          {title}
        </Text>
        <SimpleGrid columns={2} w="100%">
          {properties.map((property, index) => (
            <LabeledData key={index} data={property} fontSize={fontSize} />
          ))}
        </SimpleGrid>
      </VStack>
    </Card>
  );
};

interface LabeledDataProps {
  data: Data;
  fontSize: number;
}

const LabeledData: React.FC<LabeledDataProps> = ({ data, fontSize }) => {
  return (
    <VStack spacing="8px" fontSize={`${fontSize}px`} alignItems="start">
      <Text as={motion.p} textStyle="p" color="primary.800">
        {data.label}
      </Text>
      <Text as={motion.p} textStyle="p" color="gray.500" textAlign="left">
        {data.value === "" ? "Not provided" : data.value}
      </Text>
    </VStack>
  );
};

export default DataCard;
