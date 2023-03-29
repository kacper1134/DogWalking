import {
  Image,
  Flex,
  VStack,
  Box,
  Text,
  Avatar,
  Center,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import { useState } from "react";

export interface AvatarCardProps {
  borderRadius: string;
  fontSize: number;
  height: string;
  width: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  borderRadius,
  fontSize,
  height,
  width,
}) => {
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1617975251517-b90ff061b52e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  );

  return (
    <Flex w={width} h={height}>
      <Box minWidth={height} minHeight={height} position="sticky" top="0">
        <Image
          src={image}
          w={height}
          h={height}
          objectFit="cover"
          objectPosition="top"
          borderRadius={borderRadius}
          fallback={
            <Center h="100%">
              <Avatar size="xl" />
            </Center>
          }
        />
      </Box>
      <VStack flexGrow={1} ps="16px">
        <Text
          textStyle="h2"
          fontSize={`${fontSize}px`}
          color="primary.800"
          alignSelf="start"
          position="sticky"
          top="0"
        >
          {"Kacper"} {"Kochański"}
        </Text>
        <Box
          textStyle="p"
          fontSize={`${fontSize - 2}px`}
          color="gray.500"
          alignSelf="start"
          overflowY="scroll"
        >
          {parse("<p>Hello World!</p>")}
        </Box>
      </VStack>
    </Flex>
  );
};

export default AvatarCard;
