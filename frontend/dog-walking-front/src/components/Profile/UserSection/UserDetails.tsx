import {
  Center,
  Icon,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useGetUserQuery } from "../../../store/userApiSlice";
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
import UserDetailsEditModal from "./UserDetailsEditModal";

const UserDetails = () => {
  const columns = useBreakpointValue({
    base: 1,
    md: 2,
    "2xl": 3,
  });

  const username = useSelector((state: RootState) => state.auth.username);
  const { data: details } = useGetUserQuery(username);

  const [isEditUserDetailsModalOpen, setIsEditUserDetailsModalOpen] =
    useState(false);
  const [name, setName] = useState(details?.firstName ?? "");
  const [content, setContent] = useState(details?.description ?? "");
  const [surname, setSurname] = useState(details?.lastName ?? "");
  const [gender, setGender] = useState<"Male" | "Female">(
    details?.gender === 0 ? "Male" : "Female" ?? ""
  );
  const [email, setEmail] = useState(details?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(details?.phoneNumber ?? "");
  const [imageUrl, setImageUrl] = useState(details?.imageUrl ?? "");
  const [ratePerHour, setRatePerHour] = useState(details?.ratePerHour ?? 0);

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
      value: username,
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
