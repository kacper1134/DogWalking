import { useParams } from "react-router-dom";
import PaymentWrapper from "./PaymentWrapper";

const PaymentPage = () => {
  const { walkId } = useParams();
  return <PaymentWrapper walkId={+walkId!} />
};

export default PaymentPage;