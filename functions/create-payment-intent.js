// domain/.netlify/functions/create-payment-intent
require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY);

exports.handler = async function (event, context) {
  console.log(event);
  if (event.body) {
    const { cart, shopping_fee, total_amount } = JSON.parse(event.body);
    console.log(shopping_fee, total_amount);

    const calculateOrderAmount = () => {
      console.log(shopping_fee, total_amount);
      return shopping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'pln',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }

  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};
