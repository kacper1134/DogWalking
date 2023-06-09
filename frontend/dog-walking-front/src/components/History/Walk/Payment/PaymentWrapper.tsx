import { Box } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useGetPaymentIntentSecretQuery } from "../../../../store/walkApiSlice";
import CheckoutForm from "./CheckoutForm";
import { appearance } from "./PaymentApperance";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY as string);

type PaymentWrapperProps = {
  walkId: number;
};

const PaymentWrapper = ({ walkId }: PaymentWrapperProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const { data: paymentIntentSecret } = useGetPaymentIntentSecretQuery(
    "" + walkId
  );
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    if (paymentIntentSecret !== undefined) {
      setClientSecret(paymentIntentSecret.client_secret);
    }
  }, [paymentIntentSecret]);
  console.log(walkId);
  return (
    <Box w="100%" h="100%" bg="primary.50" flexGrow="10000">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
};

export default PaymentWrapper;
