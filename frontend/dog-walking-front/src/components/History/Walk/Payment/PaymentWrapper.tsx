import { Box } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { appearance } from "./PaymentApperance";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY as string);

type PaymentWrapperProps = {
  walkId: number;
};

const PaymentWrapper = ({ walkId: orderId }: PaymentWrapperProps) => {
  const [clientSecret, setClientSecret] = useState("");

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Box w="100%" h="100%" bg="primary.50">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
};

export default PaymentWrapper;
