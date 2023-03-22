import {
  Button,
  Center,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import Form from "../../Form";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { authActions } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

export const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form width="550px" height="550px" borderRadius="40px">
      <Center h="550px">
        <VStack w="100%" spacing="5">
          <Text fontSize="35px" fontWeight="bold">
            Login
          </Text>
          <LoginInput setLogin={setLogin} />
          <PasswordInput setPassword={setPassword} />
          <LoginButton login={login} password={password} />
          <RegisterButton />
        </VStack>
      </Center>
    </Form>
  );
};

interface LoginInputProps {
  setLogin: React.Dispatch<React.SetStateAction<string>>;
}

const LoginInput = ({ setLogin }: LoginInputProps) => {
  const changeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLogin = e.target.value;
    setLogin(newLogin);
  };

  return (
    <FormControl w="70%">
      <FormLabel>Username</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={FaUser} />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Enter username"
          onChange={changeLoginHandler}
        ></Input>
      </InputGroup>
    </FormControl>
  );
};

interface PasswordInputProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput = ({ setPassword }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return (
    <FormControl w="70%">
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <InputLeftElement>
          <Icon as={RiLockPasswordLine} />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          onChange={changePasswordHandler}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

interface LoginButtonProps {
  login: string;
  password: string;
}

const LoginButton = ({login, password} : LoginButtonProps) => {
  const dispatch = useDispatch();
  const loginHandler = () => {
    console.log(`Sending request to check if login ${login} and password ${password} are correct`);
    dispatch(authActions.login());
  }
  return <Button w="70%" onClick={loginHandler}>LOGIN</Button>;
};

const RegisterButton = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/register");
  };
  return (
    <HStack>
      <Text color="gray">Not a member?</Text>
      <Text cursor="pointer" onClick={clickHandler}>
        Sign up now
      </Text>
    </HStack>
  );
};
