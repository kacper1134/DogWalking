import {
  HStack,
  useBreakpointValue,
  Image,
  Spacer,
  useToken,
  Box,
  Text,
  MenuList,
  MenuButton,
  Menu,
  IconButton,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { JSXElementConstructor, ReactElement } from "react";
import { useLocation, useNavigate } from "react-router";
import { iconSize, linkSize, menuHeight } from "./NavbarSizes";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion, Variants } from "framer-motion";

export const Navbar = () => {
  const isDropdown = useBreakpointValue({ base: true, lg: false })!;
  const navigate = useNavigate();

  return (
    <HStack
      w="100%"
      px="8px"
      h={menuHeight}
      lineHeight={menuHeight}
      bg="purple.600"
      position="sticky"
      top="0"
      zIndex="docked"
    >
      <Image
        src="/DogWalking.png"
        h="80%"
        onClick={() => navigate("/")}
        cursor="pointer"
      />
      {!isDropdown && (
        <>
          <Spacer />
          <MenuLinks />
        </>
      )}
      <Spacer />
      <MenuIcons isDropdown={isDropdown} />
    </HStack>
  );
};

type Link = {
  text: string;
  path: string;
};

const LINKS: Link[] = [
  {
    text: "home",
    path: "/",
  },
  {
    text: "walks",
    path: "/walks",
  },
  {
    text: "about",
    path: "/about",
  },
];

const MenuLinks: React.FC<{}> = () => {
  return (
    <HStack
      h="inherit"
      lineHeight="inherit"
      spacing={{ base: "0.65em", xl: "1.5em" }}
    >
      {LINKS.map((link) => (
        <MenuLink key={link.text} to={link.path} text={link.text} />
      ))}
    </HStack>
  );
};

interface MenuLinkProps {
  to: string;
  text: string;
}

const MenuLink = ({ to, text }: MenuLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [basicColor, hoverColor] = useToken("colors", [
    "primary.50",
    "primary.100",
  ]);

  return (
    <Box h="inherit" lineHeight="inherit">
      <Text
        onClick={() => navigate(to)}
        textStyle="h3"
        fontSize={linkSize}
        color={location.pathname.startsWith(to) ? hoverColor : basicColor}
        _hover={{ color: hoverColor }}
        cursor="pointer"
        userSelect="none"
      >
        {text.toUpperCase()}
      </Text>
    </Box>
  );
};

interface IconDescription {
  label: string;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
}

const iconColor = "purple.50";

const hoverColor = "purple.100";

const MenuIcons: React.FC<{ isDropdown: boolean }> = ({ isDropdown }) => {
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate("/profile");
  };

  const icons: IconDescription[] = [
    {
      label: "Go to user settings",
      icon: (
        <Icon
          as={MdOutlinePersonOutline}
          boxSize={iconSize}
          onClick={profileHandler}
        />
      ),
    },
  ];

  const iconSizeValue = useBreakpointValue(iconSize) ?? "20px";

  return (
    <HStack>
      {icons.map((icon) => (
        <MenuIcon
          key={icon.label}
          label={icon.label}
          icon={icon.icon}
          iconColor={iconColor}
          hoverColor={hoverColor}
        />
      ))}
      {isDropdown && <DropdownMenu iconSize={iconSizeValue} />}
    </HStack>
  );
};

const DropdownMenu: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  const navigate = useNavigate();

  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <Box>
      <Menu>
        <MenuButton
          backgroundColor="inherit"
          _hover={{}}
          as={IconButton}
          icon={<DropdownIcon iconSize={iconSize} />}
        />
        <MenuList zIndex="dropdown" bg="purple.600">
          {LINKS.map((link) => (
            <MenuItem
              key={link.text}
              onClick={() => navigate(link.path)}
              color="purple.50"
              bg="purple.600"
              textStyle="p"
            >
              {capitalize(link.text)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

const DropdownIcon: React.FC<{ iconSize: string }> = ({ iconSize }) => {
  return (
    <Icon
      as={HamburgerIcon}
      boxSize={iconSize}
      color={iconColor}
      _hover={{ color: hoverColor }}
    />
  );
};

type MenuIconProps = {
  label: string;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  iconColor: string;
  hoverColor: string;
};

const MenuIcon = ({ label, icon, iconColor, hoverColor }: MenuIconProps) => {
  const [initialColor, animationColor] = useToken("colors", [
    iconColor,
    hoverColor,
  ]);

  const menuIconVariants: Variants = {
    initial: {
      color: initialColor,
    },
    hover: {
      color: animationColor,
    },
  };

  return (
    <IconButton
      as={motion.button}
      aria-label={label}
      icon={icon}
      variant="link"
      color={iconColor}
      variants={menuIconVariants}
      initial="initial"
      whileHover="hover"
    />
  );
};
