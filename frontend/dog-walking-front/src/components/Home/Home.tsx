import { Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { headlineFontSize, homeButtonSize } from "./HomeSizes";

export const Home = () => {
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1555355571-041985e647e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  return (
    <Flex
      bgImage={`linear-gradient(90deg, rgba(112,34,221,0.4) 0%, rgba(139,88,225,0.4) 50%, rgba(148,187,233,0.4) 100%), url(${backgroundImageUrl})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      flexGrow="10000"
      overflow="hidden"
    >
      <Center w="100%">
        <VStack w="95%">
          <Text textStyle="p" fontSize={headlineFontSize} align="center">
            Walking your dog has never been easier - take advantage of our
            community's help!
          </Text>
          <HomeButton />
        </VStack>
      </Center>
    </Flex>
  );
};

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      textStyle="p"
      fontSize={homeButtonSize}
      variant="outline"
      colorScheme="primary"
      color="primary.50"
      onClick={() => navigate("/planning")}
    >
      Get Started
    </Button>
  );
};
