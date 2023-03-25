import {
  Center,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import { IconType } from "react-icons";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebook, FaRegCopyright } from "react-icons/fa";
import { GrTwitter } from "react-icons/gr";
import { copyrightIconSize, footerFontSize, footerHeight } from "./FooterSizes";

export const Footer = () => {
  return (
    <HStack
      w="100%"
      px="12px"
      h={footerHeight}
      lineHeight={footerHeight}
      bgImage="linear-gradient(90deg, rgba(112,34,221,1) 0%, rgba(139,88,225,1) 50%, rgba(148,187,233,1) 100%);"
    >
      <Copyright />
      <Spacer />
      <SocialMediaIcons />
    </HStack>
  );
};

const Copyright = () => {
  return (
    <HStack>
      <Icon
        as={FaRegCopyright}
        color="primary.50"
        boxSize={copyrightIconSize}
      />
      <Text
        color="primary.50"
        fontWeight="semibold"
        fontSize={footerFontSize}
        textStyle="p"
      >
        Dog Walking 2023 - All Rights Reserved
      </Text>
    </HStack>
  );
};

export const socialMediaIcons: SocialMediaIconType[] = [
  {
    label: "Twitter",
    url: "https://twitter.com/",
    color: "twitter.500",
    icon: GrTwitter,
  },
  {
    label: "Facebook",
    url: "https://facebook.com/",
    color: "facebook.500",
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    url: "https://instagram.com/",
    color: "#c13584",
    icon: AiOutlineInstagram,
  },
];

const SocialMediaIcons = () => {
  const iconSize = useBreakpointValue({
    base: "16px",
    sm: "20px",
    md: "24px",
    lg: "28px",
    xl: "32px",
  })!;

  return (
    <HStack spacing={{ base: "2", sm: "5" }}>
      {socialMediaIcons.map((icon, index) => (
        <SocialMediaIcon key={index} icon={icon} size={iconSize} />
      ))}
    </HStack>
  );
};

type SocialMediaIconType = {
  label: string;
  url: string;
  color: string;
  icon: IconType;
};

type SocialMediaIconProps = {
  icon: SocialMediaIconType;
  size: string;
};

const SocialMediaIcon = ({ icon, size }: SocialMediaIconProps) => {
  const variants: Variants = {
    hover: {
      scale: 1.1,
    },
  };
  return (
    <Link href={icon.url} alignContent="center" boxSize={size} isExternal>
      <Center
        as={motion.div}
        color={icon.color}
        variants={variants}
        whileHover="hover"
      >
        <Icon as={icon.icon} boxSize={size} />
      </Center>
    </Link>
  );
};
