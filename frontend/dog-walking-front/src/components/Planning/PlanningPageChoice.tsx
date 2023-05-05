import { Box } from "@chakra-ui/react";
import ChoiceImage from "./ChoiceImage";

const PlanningPageChoice = () => {
  return (
    <>
      <ChoiceImage
        text="Book a Walker"
        backgroundImageUrl="https://images.unsplash.com/photo-1611602132366-bb71f3a3d84f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        path="booking"
      />
      <Box
        zIndex={10}
        w="5%"
        bgImage="linear-gradient(90deg, rgba(112,34,221,0.4) 0%, rgba(139,88,225,0.4) 50%, rgba(148,187,233,0.4) 100%),url(https://images.unsplash.com/photo-1632073588808-00eda958894a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)"
        flexGrow="10000"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
      ></Box>
      <ChoiceImage
        text="Choose your availability"
        backgroundImageUrl="https://images.unsplash.com/photo-1617106400337-66e7d72a466e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        path="availability"
      />
    </>
  );
};

export default PlanningPageChoice;
