import { Center, Flex, useToken } from "@chakra-ui/react";
import { RegisterForm } from "../components/Auth/Register/RegisterForm";
import { hexToRGB } from "../functions/hexToRGB";

export const RegisterPage = () => {
  const [primary200] = useToken("colors", ["primary.200"]);
  const backgroundColor = hexToRGB(primary200, 0.2);
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80";

  return (
    <Flex h="100vh" w="100vw">
      <Center
        bgImage={`linear-gradient(${backgroundColor},${backgroundColor}), url(${backgroundImageUrl})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"

        w="100%"
        h="100%"
      >
        <RegisterForm />
      </Center>
    </Flex>
  );
};
