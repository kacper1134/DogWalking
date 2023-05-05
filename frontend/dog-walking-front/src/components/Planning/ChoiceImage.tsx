import { Box, Button, Center } from "@chakra-ui/react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { backgroundVariants, slideOverlayVariants } from "./AnimationVariants";
import { fontSize } from "./PlanningDimensions";

interface ChoiceImageProps {
  text: string;
  backgroundImageUrl: string;
  path: string;
}

const ChoiceImage = ({ text, backgroundImageUrl, path }: ChoiceImageProps) => {
  const controls = useAnimationControls();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const start = useCallback(() => {
    controls.start("hoverStart");
    setIsVisible(true);
  }, [controls]);

  const end = useCallback(() => {
    controls.start("hoverEnd");
    setIsVisible(false);
  }, [controls]);

  return (
    <Box
      as={motion.div}
      animate={controls}
      variants={backgroundVariants}
      w="47.5%"
      maxW="47.5%"
      bgImage={`linear-gradient(90deg, rgba(112,34,221,0.4) 0%, rgba(139,88,225,0.4) 50%, rgba(148,187,233,0.4) 100%), url(${backgroundImageUrl})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      flexGrow="10000"
      overflow="hidden"
      position="relative"
      onHoverStart={() => {
        start();
      }}
      onHoverEnd={() => {
        end();
      }}
    >
      <Center height="full">
        <Button
          variant="outline"
          colorScheme="primary"
          color="primary.50"
          textStyle="p"
          fontSize={fontSize}
          zIndex={10}
          onClick={() => {navigate(path)}}
        >
          {text}
        </Button>
        <AnimatePresence>
          {isVisible && (
            <Box
              as={motion.div}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideOverlayVariants}
              position="absolute"
              top="0"
              left="0"
              w="full"
              h="full"
              bg="black"
            />
          )}
        </AnimatePresence>
      </Center>
    </Box>
  );
};

export default ChoiceImage;
