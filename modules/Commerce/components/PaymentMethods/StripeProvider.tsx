import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface StripeProviderProps {
  children: any;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const StripeProvider = ({ children }: StripeProviderProps) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
