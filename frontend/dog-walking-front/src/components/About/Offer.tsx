import {
  VStack,
  Text,
  Image,
  Icon,
  SimpleGrid,
  AspectRatio,
  useBreakpointValue,
} from "@chakra-ui/react";
import seperator from "../../static/seperator.png";
import { TbDog } from "react-icons/tb";
import { SiTrustpilot } from "react-icons/si";
import { IconType } from "react-icons/lib";
import { motion, TargetAndTransition } from "framer-motion";
import { GiGlassHeart } from "react-icons/gi";

export interface OfferProps {}

const Offer: React.FC<OfferProps> = () => {
  const responsiveSpacing = { sm: "10px", md: "15px", lg: "20px" };

  return (
    <VStack
      alignItems="center"
      spacing={responsiveSpacing}
      py={responsiveSpacing}
      bgColor="white"
    >
      <Heading />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
        <OfferType
          title="All about dogs"
          description="The comprehensive website, Dog Walking, is geared towards dog lovers and is dedicated to providing information and resources about dogs"
          icon={TbDog}
        />
        <OfferType
          title="Made with love"
          description="At Dog Walking, every step we take with your furry friend is made with love and care."
          icon={GiGlassHeart}
        />
        <OfferType
          title="Trusted by many"
          description="With a track record of providing reliable and high-quality services, our company is trusted by many in the pet care industry."
          icon={SiTrustpilot}
        />
      </SimpleGrid>
    </VStack>
  );
};

const Heading: React.FC<{}> = () => {
  const seperatorSize = {
    base: "100px",
    md: "125px",
    lg: "150px",
    xl: "175px",
    "2xl": "200px",
  };

  return (
    <>
      <Text
        textStyle="a2"
        color="primary.600"
        fontWeight="normal"
        textAlign="center"
        userSelect="none"
        textTransform="uppercase"
      >
        about us
      </Text>
      <AspectRatio ratio={3} w={seperatorSize}>
        <Image src={seperator} userSelect="none" objectFit="contain" />
      </AspectRatio>
      <Text
        mt="10px"
        textStyle="s2"
        userSelect="none"
        textAlign="center"
        color="primary.600"
        w={{ base: "80%", md: "60%", lg: "40%" }}
      >
        DogWalking fosters a culture of openness and prioritizes the well-being
        of both our employees and customers, resulting in effective
        collaboration, faster goal achievement, and efficient problem-solving.
        Our dedication to digital transformation has elevated our services and
        improved overall customer satisfaction.
      </Text>
    </>
  );
};

interface OfferTypeProps {
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconType;
}

const OfferType: React.FC<OfferTypeProps> = ({ title, description, icon }) => {
  const hoverEffect: TargetAndTransition = {
    scale: [1, 1.05],
    transition: {
      scale: {
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const iconHeaderFontSize = useBreakpointValue({
    base: "16px",
    sm: "18px",
    md: "20px",
    lg: "22px",
    xl: "26px",
  });
  const iconSize = useBreakpointValue({
    base: "50px",
    sm: "60px",
    md: "70px",
    lg: "80px",
    xl: "90px",
  });

  return (
    <VStack alignItems="center" userSelect="none" mt="30px">
      <Icon
        as={icon}
        color="primary.500"
        objectFit="cover"
        boxSize={iconSize}
      />
      <Text
        as={motion.div}
        whileHover={hoverEffect}
        textStyle="a1"
        fontSize={iconHeaderFontSize}
        textAlign="center"
        cursor="pointer"
        textTransform="uppercase"
        color="primary.600"
      >
        {title}
      </Text>
      <Text
        textStyle="s2"
        textAlign="center"
        color="primary.600"
        w={{ sm: "80vw", md: "40vw", lg: "20vw" }}
      >
        {description}
      </Text>
    </VStack>
  );
};

export default Offer;
