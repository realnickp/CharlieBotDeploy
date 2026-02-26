// square-integration.js - Payment processing for Charlie Bot's guide
// Requires environment variables from .env file

require('dotenv').config();

const { Client, Environment } = require('square');

// Determine environment
const isProduction = process.env.SQUARE_ENVIRONMENT === 'production';

// Select credentials based on environment
const accessToken = isProduction 
  ? process.env.SQUARE_ACCESS_TOKEN 
  : process.env.SQUARE_SANDBOX_TOKEN;
const applicationId = isProduction 
  ? process.env.SQUARE_APPLICATION_ID 
  : process.env.SQUARE_SANDBOX_APPLICATION_ID;
const locationId = isProduction 
  ? process.env.SQUARE_LOCATION_ID 
  : process.env.SQUARE_SANDBOX_LOCATION_ID;

// Validate environment variables
if (!accessToken) {
  console.error(`Missing ${isProduction ? 'production' : 'sandbox'} access token`);
  console.error('Please check your .env file');
  process.exit(1);
}

// Initialize Square client
const client = new Client({
  accessToken: accessToken,
  environment: isProduction ? Environment.Production : Environment.Sandbox
});

const { paymentsApi } = client;

// Product configurations
const PRODUCTS = {
  quickstart: {
    id: 'quick-start-guide',
    name: 'OpenClaw Quick Start Guide',
    price: 3900, // $39.00 in cents
    description: 'The "I just want to get this working" package'
  },
  fullsystem: {
    id: 'full-system-guide',
    name: 'OpenClaw Full System',
    price: 9700, // $97.00 in cents
    description: 'The "I want to actually scale this" package'
  }
};

// Import email service
const { handleSuccessfulPayment } = require('./email-service');

// Create payment
async function createPayment(sourceId, productKey, buyerEmail) {
  try {
    const product = PRODUCTS[productKey];
    if (!product) {
      throw new Error('Invalid product key');
    }

    const payment = {
      sourceId: sourceId,
      amountMoney: {
        amount: BigInt(product.price),
        currency: 'USD'
      },
      idempotencyKey: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      note: `Purchase: ${product.name} by ${buyerEmail}`,
      locationId: locationId
    };

    const response = await paymentsApi.createPayment(payment);
    const paymentResult = {
      success: true,
      paymentId: response.result.payment.id,
      status: response.result.payment.status,
      receiptUrl: response.result.payment.receiptUrl,
      product: product
    };
    
    // Send emails on successful payment
    if (paymentResult.success) {
      try {
        const emailResult = await handleSuccessfulPayment({
          product: product,
          customerEmail: buyerEmail,
          paymentId: paymentResult.paymentId,
          amount: product.price
        });
        console.log('Emails sent:', emailResult);
        paymentResult.emailsSent = emailResult;
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the payment if email fails
        paymentResult.emailError = emailError.message;
      }
    }
    
    return paymentResult;
  } catch (error) {
    console.error('Payment failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Verify payment (for webhook handling)
async function verifyPayment(paymentId) {
  try {
    const response = await paymentsApi.getPayment(paymentId);
    return {
      success: true,
      status: response.result.payment.status,
      amount: response.result.payment.amountMoney.amount,
      receiptUrl: response.result.payment.receiptUrl
    };
  } catch (error) {
    console.error('Verification failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Webhook handler for payment confirmations
function handleWebhook(event) {
  const { type, data } = event;
  
  switch (type) {
    case 'payment.created':
      console.log('Payment created:', data.object.payment.id);
      // Trigger delivery system here
      break;
      
    case 'payment.completed':
      console.log('Payment completed:', data.object.payment.id);
      // Send confirmation email
      // Trigger product delivery
      break;
      
    case 'payment.failed':
      console.log('Payment failed:', data.object.payment.id);
      // Send failure notification
      break;
  }
}

module.exports = {
  createPayment,
  verifyPayment,
  handleWebhook,
  PRODUCTS
};
