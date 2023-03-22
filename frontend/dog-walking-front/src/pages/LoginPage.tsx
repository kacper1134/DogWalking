import { Center, Flex, useToken } from "@chakra-ui/react";
import { LoginForm } from "../components/Auth/Login/LoginForm";
import { hexToRGB } from "../functions/hexToRGB";

export const LoginPage = () => {
  const [primary200] = useToken("colors", ["primary.200"]);
  const backgroundColor = hexToRGB(primary200, 0.2);
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80";

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
        <LoginForm />
      </Center>
    </Flex>
  );
};
