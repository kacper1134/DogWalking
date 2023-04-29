import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router";
import AvailabityPage from "../components/Walks/AvailabityPage/AvailabityPage";
import WalksPageChoice from "../components/Walks/WalksPageChoice";

const WalksPage = () => {
  return (
    <Flex flexGrow="10000" overflow="hidden">
      <Routes>
        <Route path="/availability" element={<AvailabityPage />} />
        <Route path="/" element={<WalksPageChoice />} />
      </Routes>
    </Flex>
  );
};

export default WalksPage;
