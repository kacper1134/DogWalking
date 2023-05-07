import { useSearchParams } from "react-router-dom";
import PaymentWrapper from "./PaymentWrapper";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const walkId = searchParams.get("walkId");
  return <PaymentWrapper walkId={+walkId!} />
};

export default PaymentPage;