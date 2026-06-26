/**
 * PAYMENT SERVICE PLACEHOLDERS
 * 
 * IMPORTANT: DO NOT HARDCODE API KEYS HERE.
 * Keys should be placed in the .env file at the root of the backend folder.
 * 
 * Expected Environment Variables:
 * VITE_RAZORPAY_KEY=your_key_here
 * RAZORPAY_SECRET=your_secret_here
 * STRIPE_SECRET=your_stripe_secret_here
 */

// const Razorpay = require('razorpay');
// const stripe = require('stripe')(process.env.STRIPE_SECRET);

const createOrder = async (amount, currency = 'INR', method) => {
  if (method === 'Razorpay') {
    /*
    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt: "receipt_order_74394",
    };
    
    const order = await razorpay.orders.create(options);
    return order;
    */
    console.log("Mocking Razorpay Order Creation");
    return { id: `order_rzp_mock_${Date.now()}`, amount: amount * 100, currency };
  } 
  
  if (method === 'Stripe') {
    /*
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency.toLowerCase(),
      // automatic_payment_methods: { enabled: true },
    });
    return paymentIntent;
    */
    console.log("Mocking Stripe Payment Intent");
    return { id: `pi_stripe_mock_${Date.now()}`, client_secret: "mock_secret" };
  }

  // Cash on Delivery
  return { id: `order_cod_${Date.now()}`, amount, currency };
};

const verifyPayment = async (orderId, paymentId, signature, method) => {
  if (method === 'Razorpay') {
    /*
    const crypto = require('crypto');
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                                    .update(orderId + "|" + paymentId)
                                    .digest('hex');
    return expectedSignature === signature;
    */
    return true; // Mock verification
  }
  return true;
};

module.exports = {
  createOrder,
  verifyPayment
};
