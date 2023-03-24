import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useNavigate } from "react-router";
import Form from "../../Form";
import {
  headerFontSize,
  registerFormHeight,
  registerFormWidth,
  textFontSize,
} from "./RegisterFormSizes";
import { CustomResponsiveValue } from "../Login/LoginFormSizes";
import { useState } from "react";
import {
  getErrorMessageForEmail,
  getErrorMessageForFirstName,
  getErrorMessageForLastName,
  getErrorMessageForPassword,
  getErrorMessageForUsername,
} from "./RegisterFormErrorMessageFunctions";

export const RegisterForm = () => {
  const headingSize = useBreakpointValue(headerFontSize);
  const fontSize = useBreakpointValue(textFontSize);
  const responsiveFontSize = fontSize ?? "20px";

  const height = useBreakpointValue(registerFormHeight);
  const width = useBreakpointValue(registerFormWidth);

  const [username, setUsername] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

  const [lastName, setLastName] = useState("");
  const [isLastNameInvalid, setIsLastNameInvalid] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  return (
    <Form width={width} height={height} borderRadius="40px">
      <Center h={height}>
        <VStack spacing="5" w="70%">
          <Text fontWeight="bold" fontSize={headingSize} textStyle="p">
            Register
          </Text>
          <Text textStyle="p" fontSize={responsiveFontSize}>
            Fill out this form
          </Text>
          <NameInput
            fontSize={responsiveFontSize}
            setFirstName={setFirstName}
            isFirstNameInvalid={isFirstNameInvalid}
            firstNameErrorMessage={firstNameErrorMessage}
            setLastName={setLastName}
            isLastNameInvalid={isLastNameInvalid}
            lastNameErrorMessage={lastNameErrorMessage}
          />
          <InputWithIcon
            isInvalid={isUsernameInvalid}
            errorMessage={usernameErrorMessage}
            setInput={setUsername}
            icon={FaUser}
            placeholder="Username"
            fontSize={responsiveFontSize}
            type="text"
          />
          <InputWithIcon
            isInvalid={isEmailInvalid}
            errorMessage={emailErrorMessage}
            setInput={setEmail}
            icon={AiOutlineMail}
            placeholder="E-mail Address"
            fontSize={responsiveFontSize}
            type="text"
          />
          <InputWithIcon
            isInvalid={isPasswordInvalid}
            errorMessage={passwordErrorMessage}
            setInput={setPassword}
            icon={AiFillLock}
            placeholder="Password"
            fontSize={responsiveFontSize}
            type="password"
          />
          <RegisterButton
            fontSize={responsiveFontSize}
            username={username}
            setIsUsernameInvalid={setIsUsernameInvalid}
            setUsernameErrorMessage={setUsernameErrorMessage}
            email={email}
            setIsEmailInvalid={setIsEmailInvalid}
            setEmailErrorMessage={setEmailErrorMessage}
            password={password}
            setIsPasswordInvalid={setIsPasswordInvalid}
            setPasswordErrorMessage={setPasswordErrorMessage}
            firstName={firstName}
            setIsFirstNameInvalid={setIsFirstNameInvalid}
            setFirstNameErrorMessage={setFirstNameErrorMessage}
            lastName={lastName}
            setIsLastNameInvalid={setIsLastNameInvalid}
            setLastNameErrorMessage={setLastNameErrorMessage}
          />
          <LoginButton fontSize={responsiveFontSize} />
        </VStack>
      </Center>
    </Form>
  );
};

interface NameInputProps {
  fontSize: CustomResponsiveValue | string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  isFirstNameInvalid: boolean;
  firstNameErrorMessage: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  isLastNameInvalid: boolean;
  lastNameErrorMessage: string;
}

const NameInput = ({
  fontSize,
  setFirstName,
  setLastName,
  firstNameErrorMessage,
  lastNameErrorMessage,
  isFirstNameInvalid,
  isLastNameInvalid,
}: NameInputProps) => {
  const changeFirstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFistName = e.target.value;
    setFirstName(newFistName);
  };
  const changeLastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
  };
  return (
    <HStack>
      <FormControl>
        <Input
          isInvalid={isFirstNameInvalid}
          pr="4.5rem"
          type="text"
          placeholder="First Name"
          variant="filled"
          fontSize={fontSize}
          onChange={changeFirstNameHandler}
        />
        <FormHelperText>{firstNameErrorMessage}</FormHelperText>
      </FormControl>
      <FormControl>
        <Input
          isInvalid={isLastNameInvalid}
          pr="4.5rem"
          type="text"
          placeholder="Last Name"
          variant="filled"
          fontSize={fontSize}
          onChange={changeLastNameHandler}
        />
        <FormHelperText>{lastNameErrorMessage}</FormHelperText>
      </FormControl>
    </HStack>
  );
};

interface InputWithIconProps {
  icon: IconType;
  type: string;
  placeholder: string;
  fontSize: CustomResponsiveValue | string;
  isInvalid: boolean;
  errorMessage: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const InputWithIcon = ({
  icon,
  placeholder,
  fontSize,
  isInvalid,
  errorMessage,
  setInput,
  type,
}: InputWithIconProps) => {
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  var realType = type;

  if (type === "password") {
    realType = showPassword ? "text" : "password";
  }

  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement>
          <Icon as={icon} fontSize={fontSize} />
        </InputLeftElement>

        <Input
          isInvalid={isInvalid}
          pr="4.5rem"
          type={realType}
          placeholder={placeholder}
          variant="filled"
          fontSize={fontSize}
          onChange={changeInputHandler}
        ></Input>
        {type === "password" && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

interface RegisterButtonProps {
  fontSize: CustomResponsiveValue | string;
  username: string;
  setIsUsernameInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  setUsernameErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setIsEmailInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setIsPasswordInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  setIsFirstNameInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstNameErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setIsLastNameInvalid: React.Dispatch<React.SetStateAction<boolean>>;
  setLastNameErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterButton = ({
  fontSize,
  username,
  setIsUsernameInvalid,
  setUsernameErrorMessage,
  email,
  setIsEmailInvalid,
  setEmailErrorMessage,
  password,
  setIsPasswordInvalid,
  setPasswordErrorMessage,
  firstName,
  setIsFirstNameInvalid,
  setFirstNameErrorMessage,
  lastName,
  setIsLastNameInvalid,
  setLastNameErrorMessage,
}: RegisterButtonProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const registerHandler = () => {
    var isInvalid = false;

    const usernameErrorMessage = getErrorMessageForUsername(username);
    setUsernameErrorMessage(usernameErrorMessage);
    setIsUsernameInvalid(usernameErrorMessage !== "");

    if (usernameErrorMessage !== "") {
      isInvalid = true;
    }

    const emailErrorMessage = getErrorMessageForEmail(email);
    setEmailErrorMessage(emailErrorMessage);
    setIsEmailInvalid(emailErrorMessage !== "");

    if (emailErrorMessage !== "") {
      isInvalid = true;
    }

    const passwordErrorMessage = getErrorMessageForPassword(password);
    setPasswordErrorMessage(passwordErrorMessage);
    setIsPasswordInvalid(passwordErrorMessage !== "");

    if (passwordErrorMessage !== "") {
      isInvalid = true;
    }

    const firstNameErrorMessage = getErrorMessageForFirstName(firstName);
    setFirstNameErrorMessage(firstNameErrorMessage);
    setIsFirstNameInvalid(firstNameErrorMessage !== "");

    if (firstNameErrorMessage !== "") {
      isInvalid = true;
    }

    const lastNameErrorMessage = getErrorMessageForLastName(lastName);
    setLastNameErrorMessage(lastNameErrorMessage);
    setIsLastNameInvalid(lastNameErrorMessage !== "");

    if (lastNameErrorMessage !== "") {
      isInvalid = true;
    }

    if (!isInvalid) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    }
  };
  return (
    <Button
      w="100%"
      textStyle="p"
      fontSize={fontSize}
      onClick={registerHandler}
    >
      Create Account
    </Button>
  );
};

interface LoginButtonProps {
  fontSize: CustomResponsiveValue | string;
}

const LoginButton = ({ fontSize }: LoginButtonProps) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/login");
  };
  return (
    <HStack>
      <Text color="gray" textStyle="p" fontSize={fontSize}>
        Already have an account?
      </Text>
      <Text
        textStyle="p"
        cursor="pointer"
        onClick={clickHandler}
        fontSize={fontSize}
      >
        Log in
      </Text>
    </HStack>
  );
};
