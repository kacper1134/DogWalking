import {
  Center,
  Icon,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import Card from "../../Card";
import AvatarCard from "./AvatarCard";
import DataCard, { Data } from "./DataCard";
import {
  borderRadius,
  cardHeight,
  cardWidth,
  fontSize,
  headingSize,
  iconButtonSize,
  mainMargin,
  mainPadding,
  width,
} from "./ProfileDetailsDimensions";
import UserDetailsEditModal, { UserDetailsType } from "./UserDetailsEditModal";

const MOCK_USER_DETAILS: UserDetailsType = {
  name: "Kacper",
  surname: "Kochański",
  email: "kacper2000@o2.pl",
  ratePerHour: 50,
  phoneNumber: "",
  imageUrl:
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  username: "kacper1134",
  gender: null,
  description:
    "<p>Hi there! My name is Kacper and I'm a proud dog owner. My furry friend is more than just a pet - they're a loyal companion who brings so much joy and happiness into my life. I'm passionate about providing the best possible care for my dog, including regular exercise, proper nutrition, and plenty of playtime. When I'm not spending time with my dog, I enjoy reading books about dog behavior and training, as well as exploring new parks and trails together.</p>",
};

const UserDetails = () => {
  const columns = useBreakpointValue({
    base: 1,
    md: 2,
    "2xl": 3,
  });

  const [isEditUserDetailsModalOpen, setIsEditUserDetailsModalOpen] =
    useState(false);

  const [name, setName] = useState(MOCK_USER_DETAILS.name);
  const [content, setContent] = useState(MOCK_USER_DETAILS.description);
  const [surname, setSurname] = useState(MOCK_USER_DETAILS.surname);
  const [gender, setGender] = useState(MOCK_USER_DETAILS.gender);
  const [email, setEmail] = useState(MOCK_USER_DETAILS.email);
  const [phoneNumber, setPhoneNumber] = useState(MOCK_USER_DETAILS.phoneNumber);
  const [imageUrl, setImageUrl] = useState(MOCK_USER_DETAILS.imageUrl);
  const [ratePerHour, setRatePerHour] = useState(MOCK_USER_DETAILS.ratePerHour);

  const contactInformation: Data[] = [
    {
      label: "Email Address",
      value: email,
    },
    {
      label: "Phone Number",
      value: phoneNumber,
    },
  ];

  const personalDetails: Data[] = [
    {
      label: "Username",
      value: MOCK_USER_DETAILS.username,
    },
    {
      label: "Gender",
      value: gender ?? "Not provided",
    },
    {
      label: "Rate Per Hour",
      value: "$" + ratePerHour,
    },
  ];
  
  return (
    <>
      <Center w="100%">
        <Text textStyle="h3" color="primary.500" fontSize={headingSize}>
          User Details
        </Text>
        <Icon
          as={AiFillEdit}
          color="orange"
          cursor="pointer"
          fontSize={iconButtonSize}
          ml="20px"
          onClick={() => setIsEditUserDetailsModalOpen(true)}
        />
      </Center>
      <Card
        px={mainPadding + "px"}
        py={mainPadding + "px"}
        mx={mainMargin + "px"}
        my={mainMargin + "px"}
        width={useBreakpointValue(width)!}
        borderRadius={borderRadius}
      >
        <SimpleGrid
          columns={columns}
          spacing="8px"
          justifyItems="center"
          bg="white"
        >
          <AvatarCard
            borderRadius={borderRadius}
            fontSize={useBreakpointValue(fontSize)!}
            height={useBreakpointValue(cardHeight)!}
            width={useBreakpointValue(cardWidth)!}
            userDetails={{
              name: name,
              surname: surname,
              imageUrl: imageUrl ?? "",
              content: content,
            }}
          />
          <DataCard
            borderRadius={borderRadius}
            fontSize={useBreakpointValue(fontSize)!}
            height={useBreakpointValue(cardHeight)!}
            width={useBreakpointValue(cardWidth)!}
            title="Personal Details"
            properties={personalDetails}
          />
          <DataCard
            borderRadius={borderRadius}
            fontSize={useBreakpointValue(fontSize)!}
            height={useBreakpointValue(cardHeight)!}
            width={useBreakpointValue(cardWidth)!}
            title="Contact Information"
            properties={contactInformation}
          />
        </SimpleGrid>
      </Card>
      <UserDetailsEditModal
        isOpen={isEditUserDetailsModalOpen}
        setIsOpen={setIsEditUserDetailsModalOpen}
        content={content}
        setContent={setContent}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        name={name}
        setName={setName}
        surname={surname}
        setSurname={setSurname}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        gender={gender}
        ratePerHour={ratePerHour}
        setRatePerHour={setRatePerHour}
        setGender={setGender}
      />
    </>
  );
};

export default UserDetails;
