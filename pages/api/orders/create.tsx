import WC from '@lib/commerce/initWoocommerce';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const handler = async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    if (!body) throw 'No body';

    const data = {
      ...body,
    };

    let order;
    if (data.payment_method === 'invoice') {
      order = await WC.post('orders', data);
    }
    if (!order && data.payment_method === 'invoice') {
      throw 'Something went wrong while creating the order';
    }
    if (data.payment_method === 'stripe') {
      order = await WC.post('orders', { ...data, status: 'pending' });
      const amount = data.amount * 100;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
        payment_method_types: ['card'],
        description: `#${order.data.id} - Samon`,
        metadata: {
          integration_check: 'accept_a_payment',
          WoocommerceOrderId: order.data.id,
        },
      });
      if (!paymentIntent.client_secret) {
        console.log(
          'Something went wrong when getting client secret from Stripe'
        );
        res.status(400).json({
          success: false,
          message: 'Could not retrieve client secret from payment intent',
        });
        return;
      }
      console.log('Success getting client secret, returning', paymentIntent);
      res.status(200).json({
        success: true,
        statusCode: order.status,
        data: { ...order.data, stripe: { ...paymentIntent } },
      });
      return;
    } else {
      res.status(200).json({
        statusCode: order.status,
        ...order.data,
      });
      return;
    }
  } catch (error) {
    console.log('ERROR CREATING ORDER =>', error);
    res.status(500).json(error);
    return;
  }
};
export default handler;
