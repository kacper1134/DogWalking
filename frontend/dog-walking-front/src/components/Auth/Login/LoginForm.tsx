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
  useBreakpointValue,
  Alert,
  AlertIcon,
  Collapse,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import Form from "../../Form";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { authActions } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import {
  CustomResponsiveValue,
  errorMessageFontSize,
  headerFontSize,
  loginFormHeight,
  loginFormWidth,
  textFontSize,
} from "./LoginFormSizes";

export const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialsValid, setIsCredentialsValid] = useState(true);

  const height = useBreakpointValue(loginFormHeight);
  const width = useBreakpointValue(loginFormWidth);

  const headingSize = useBreakpointValue(headerFontSize);
  const fontSize = useBreakpointValue(textFontSize);
  const responsiveFontSize = fontSize ?? "20px";
  const errorMessageResponsiveFontSize =
    useBreakpointValue(errorMessageFontSize) ?? "16px";

  return (
    <Form width={width} height={height} borderRadius="40px">
      <Center h={height}>
        <VStack w="100%" spacing="5">
          <Text fontWeight="bold" fontSize={headingSize} textStyle="p">
            Login
          </Text>
          <LoginInput setLogin={setLogin} fontSize={responsiveFontSize} />
          <PasswordInput
            setPassword={setPassword}
            fontSize={responsiveFontSize}
          />
          <Box as={Collapse} in={!isCredentialsValid} w="70%">
            <InvalidCredentialsAlert
              fontSize={errorMessageResponsiveFontSize}
            />
          </Box>
          <LoginButton
            login={login}
            password={password}
            fontSize={responsiveFontSize}
            setIsCredentialsValid={setIsCredentialsValid}
          />
          <RegisterButton fontSize={responsiveFontSize} />
        </VStack>
      </Center>
    </Form>
  );
};

interface LoginInputProps {
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  fontSize: CustomResponsiveValue | string;
}

const LoginInput = ({ setLogin, fontSize }: LoginInputProps) => {
  const changeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLogin = e.target.value;
    setLogin(newLogin);
  };

  return (
    <FormControl w="70%" textStyle="p">
      <FormLabel fontSize={fontSize}>Username</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={FaUser} fontSize={fontSize} />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Enter username"
          onChange={changeLoginHandler}
          fontSize={fontSize}
        ></Input>
      </InputGroup>
    </FormControl>
  );
};

interface PasswordInputProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  fontSize: CustomResponsiveValue | string;
}

const PasswordInput = ({ setPassword, fontSize }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return (
    <FormControl w="70%" textStyle="p">
      <FormLabel fontSize={fontSize}>Password</FormLabel>
      <InputGroup size="md">
        <InputLeftElement>
          <Icon as={RiLockPasswordLine} fontSize={fontSize} />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          onChange={changePasswordHandler}
          fontSize={fontSize}
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
  fontSize: CustomResponsiveValue | string;
  setIsCredentialsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginButton = ({
  login,
  password,
  fontSize,
  setIsCredentialsValid,
}: LoginButtonProps) => {
  const dispatch = useDispatch();
  const loginHandler = () => {
    if (login === "admin" && password === "toor") {
      dispatch(authActions.login());
      setIsCredentialsValid(true);
    } else {
      setIsCredentialsValid(false);
    }
  };
  return (
    <Button w="70%" onClick={loginHandler} fontSize={fontSize} textStyle="p">
      LOGIN
    </Button>
  );
};

interface RegisterButtonProps {
  fontSize: CustomResponsiveValue | string;
}

const RegisterButton = ({ fontSize }: RegisterButtonProps) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/register");
  };
  return (
    <HStack>
      <Text color="gray" fontSize={fontSize} textStyle="p">
        Not a member?
      </Text>
      <Text
        cursor="pointer"
        onClick={clickHandler}
        fontSize={fontSize}
        textStyle="p"
      >
        Sign up now
      </Text>
    </HStack>
  );
};

interface InvalidCredentialsAlertProps {
  fontSize: CustomResponsiveValue | string;
}

const InvalidCredentialsAlert = ({
  fontSize,
}: InvalidCredentialsAlertProps) => {
  return (
    <Alert
      status="error"
      variant="left-accent"
      fontSize={fontSize}
      colorScheme="secondary"
      textStyle="p"
    >
      <AlertIcon />
      Invalid username or password.
    </Alert>
  );
};
