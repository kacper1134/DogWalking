import { Card, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";
import AvatarCard from "./AvatarCard";
import DataCard, { Data } from "./DataCard";

const ProfileDetails = () => {
  const headingSize = useBreakpointValue({
    base: 24,
    md: 32,
    xl: 36,
  })!;

  const fontSize = useBreakpointValue({
    base: 14,
    lg: 15,
    "2xl": 16,
  })!;
  const cardHeight = "150px";
  const cardWidth = useBreakpointValue({
    base: "300px",
    lg: "350px",
    "2xl": "375px",
  })!;

  const mainPadding = 32;
  const mainMargin = 32;
  const borderRadius = "16px";

  const columns = useBreakpointValue({
    base: 1,
    md: 2,
    "2xl": 3,
  });

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
      <Text
        textStyle="h3"
        color="primary.50"
        fontSize={headingSize + "px"}
        textAlign="center"
        w="100%"
        bg="rgba(139,88,225,1)"
        boxShadow="0 4px 4px 0 rgba(0,0,0,0.25)"
      >
        User Details
      </Text>
      <Card
        px={mainPadding + "px"}
        py={mainPadding + "px"}
        mx={mainMargin + "px"}
        my={mainMargin + "px"}
        borderRadius={borderRadius}
        bg="white"
      >
        <SimpleGrid
          columns={columns}
          spacing="8px"
          justifyItems="center"
          bg="white"
        >
          <AvatarCard
            borderRadius={borderRadius}
            fontSize={fontSize}
            height={cardHeight}
            width={cardWidth}
          />
          <DataCard
            borderRadius={borderRadius}
            fontSize={fontSize}
            height={cardHeight}
            width={cardWidth}
            title="Personal Details"
            properties={personalDetails}
          />
          <DataCard
            borderRadius={borderRadius}
            fontSize={fontSize}
            height={cardHeight}
            width={cardWidth}
            title="Contact Information"
            properties={contactInformation}
          />
        </SimpleGrid>
      </Card>
    </>
  );
};

export default ProfileDetails;
