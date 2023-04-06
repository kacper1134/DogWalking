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
import Card from "../../Card";
import { userCardDescriptionWidth } from "./ProfileDetailsDimensions";

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
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );

  return (
    <Card width={width} height={height} px="20px" py="20px" borderRadius="15px">
      <Flex>
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
        <VStack maxH={height} w={userCardDescriptionWidth} ps="16px">
          <Text
            textStyle="h2"
            fontSize={`${fontSize}px`}
            color="primary.800"
            alignSelf="start"
            position="sticky"
            px="10px"
            top="0"
          >
            {"Kacper"} {"Kochański"}
          </Text>
          <Box
            textStyle="p"
            fontSize={`${fontSize}px`}
            maxH={height}
            px="10px"
            color="gray.500"
            alignSelf="start"
            overflowY="scroll"
          >
            {parse(
              "<p>Hi there! My name is Kacper and I'm a proud dog owner. My furry friend is more than just a pet - they're a loyal companion who brings so much joy and happiness into my life. I'm passionate about providing the best possible care for my dog, including regular exercise, proper nutrition, and plenty of playtime. When I'm not spending time with my dog, I enjoy reading books about dog behavior and training, as well as exploring new parks and trails together.</p>"
            )}
          </Box>
        </VStack>
      </Flex>
    </Card>
  );
};

export default AvatarCard;
