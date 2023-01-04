// domain/.netlify/functions/hello
// comunicate from here to StripeCheckout Component
// 1. comunicate to stripe
// 2. get back data from stripe

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: 'Hello, world',
  }
}