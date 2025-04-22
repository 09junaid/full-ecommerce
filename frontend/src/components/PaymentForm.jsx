import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/payment/create-payment`, {
      amount: 100, // USD 1.00
    });

    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {success && <p className="text-green-600 mt-2">Payment Successful 🎉</p>}
    </form>
  );
};

export default PaymentForm;
