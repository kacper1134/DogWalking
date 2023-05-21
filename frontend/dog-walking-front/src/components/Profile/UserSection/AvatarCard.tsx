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
import { useEffect, useState } from "react";
import useGetFirebaseImage from "../../../hooks/useGetFirebaseImage";
import Card from "../../Card";
import { userCardDescriptionWidth } from "./ProfileDetailsDimensions";

export interface AvatarCardProps {
  borderRadius: string;
  fontSize: number;
  height: string;
  width: string;
  userDetails: AvatarCardData;
}

interface AvatarCardData {
  name: string;
  surname: string;
  imageUrl: string;
  content: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  borderRadius,
  fontSize,
  height,
  width,
  userDetails,
}) => {
  const getImage = useGetFirebaseImage();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (userDetails.imageUrl !== "") {
      getImage(userDetails.imageUrl)
        .then((url) => setImage(url))
        .catch(() => setImage(""));
    }
  }, [getImage, userDetails.imageUrl]);
  
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
            {userDetails.name} {userDetails.surname}
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
            {parse(userDetails.content)}
          </Box>
        </VStack>
      </Flex>
    </Card>
  );
};

export default AvatarCard;
