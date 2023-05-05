import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router";
import AvailabityPage from "../components/Planning/AvailabityPage/AvailabityPage";
import BookingPage from "../components/Planning/BookingPage/BookingPage";
import PlanningPageChoice from "../components/Planning/PlanningPageChoice";

const PlanningPage = () => {
  return (
    <Flex flexGrow="10000" overflow="hidden">
      <Routes>
        <Route path="/availability" element={<AvailabityPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/" element={<PlanningPageChoice />} />
      </Routes>
    </Flex>
  );
};

export default PlanningPage;
