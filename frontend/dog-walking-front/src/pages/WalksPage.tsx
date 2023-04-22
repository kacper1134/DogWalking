import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router";
import WalksPageChoice from "../components/Walks/WalksPageChoice";

const WalksPage = () => {
  return (
    <Flex flexGrow="10000" overflow="hidden">
      <Routes>
        <Route path="" element={<WalksPageChoice />} />
      </Routes>
    </Flex>
  );
};

export default WalksPage;
