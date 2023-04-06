import {
  Center,
  Icon,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import Card from "../../Card";
import AvatarCard from "./AvatarCard";
import DataCard, { Data } from "./DataCard";
import DogCard from "../DogSection/DogCard";
import { exampleDogs } from "../DogSection/DogExampleInfo";
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
import { useState } from "react";
import UserDetailsEditModal from "./UserDetailsEditModal";
import DogCreateEditModal from "../DogSection/DogCreateEditModal";

const ProfileDetails = () => {
  const columns = useBreakpointValue({
    base: 1,
    md: 2,
    "2xl": 3,
  });

  const [isEditUserDetailsModalOpen, setIsEditUserDetailsModalOpen] =
    useState(false);

  const [isCreateDogModalOpen, setIsCreateDogModalOpen] = useState(false);

  const contactInformation: Data[] = [
    {
      label: "Email Address",
      value: "kacper2000@o2.pl",
    },
    {
      label: "Phone Number",
      value: "300123943",
    },
  ];

  const personalDetails: Data[] = [
    {
      label: "Username",
      value: "kacper1134",
    },
    {
      label: "Gender",
      value: "Male",
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
          color="primary.800"
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
      <Center w="100%">
        <Text textStyle="h3" color="primary.500" fontSize={headingSize}>
          Dogs
        </Text>
        <Icon
          as={AiFillPlusCircle}
          color="primary.800"
          cursor="pointer"
          fontSize={iconButtonSize}
          ml="20px"
          onClick={() => setIsCreateDogModalOpen(true)}
        />
      </Center>
      <Card
        px={mainPadding + "px"}
        py={mainPadding + "px"}
        mx={mainMargin + "px"}
        my={mainMargin + "px"}
        borderRadius={borderRadius}
      >
        <SimpleGrid columns={columns} spacing="8px" justifyItems="center">
          {exampleDogs.map((dog, index) => {
            return <DogCard dog={dog} key={index} />;
          })}
        </SimpleGrid>
      </Card>
      <UserDetailsEditModal
        isOpen={isEditUserDetailsModalOpen}
        setIsOpen={setIsEditUserDetailsModalOpen}
      />
      <DogCreateEditModal
        isEdit={false}
        isOpen={isCreateDogModalOpen}
        setIsOpen={setIsCreateDogModalOpen}
      />
    </>
  );
};

export default ProfileDetails;
