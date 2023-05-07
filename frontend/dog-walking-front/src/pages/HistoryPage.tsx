import { Route, Routes } from "react-router";
import PaymentPage from "../components/History/Walk/Payment/PaymentPage";
import WalkDetails from "../components/History/Walk/WalkDetails";
import Walks from "../components/History/Walks/Walks";

const HistoryPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Walks />} />
      <Route path="/:walkId" element={<WalkDetails />} />
      <Route path="/payment/:walkId" element={<PaymentPage />} />
    </Routes>
  );
};

export default HistoryPage;
