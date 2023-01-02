import { env } from 'process';
import Stripe from 'stripe';

const stripeKey = env.STRIPE_SECRET;

if (!stripeKey) {
  throw new Error('STRIPE_KEY env variable missing');
}

const stripeConfig = new Stripe(stripeKey, {
  apiVersion: '2022-11-15',
});

export default stripeConfig;
