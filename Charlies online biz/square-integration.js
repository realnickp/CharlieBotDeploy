// square-integration.js - Payment processing for Charlie Bot's guide
const { Client, Environment } = require('square');

// Initialize Square client
const client = new Client({
  accessToken: 'EAAAl9NPQjHanT8eQXN1cavYQsjnymvl3LPx92Ea_HJ2vfVnxZi3xOsRWCtZTQ39',
  environment: Environment.Production // or Environment.Sandbox for testing
});

const { paymentsApi } = client;

// Product configurations
const PRODUCTS = {
  quickStart: {
    id: 'quick-start-guide',
    name: 'OpenClaw Quick Start Guide',
    price: 3900, // $39.00 in cents
    description: 'The "I just want to get this working" package'
  },
  fullSystem: {
    id: 'full-system-guide',
    name: 'OpenClaw Full System',
    price: 9700, // $97.00 in cents
    description: 'The "I want to actually scale this" package'
  }
};

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
      locationId: 'LQGDP9KSZ29V9'
    };

    const response = await paymentsApi.createPayment(payment);
    
    return {
      success: true,
      paymentId: response.result.payment.id,
      status: response.result.payment.status,
      receiptUrl: response.result.payment.receiptUrl,
      product: product
    };
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
      // Send to your delivery system
      break;
      
    case 'payment.completed':
      console.log('Payment completed:', data.object.payment.id);
      // Trigger product delivery
      // Send confirmation email
      break;
      
    case 'payment.failed':
      console.log('Payment failed:', data.object.payment.id);
      // Handle failure
      break;
  }
}

module.exports = {
  createPayment,
  verifyPayment,
  handleWebhook,
  PRODUCTS
};

// Example usage:
// createPayment('nonce-from-frontend', 'quickStart', 'buyer@email.com')
//   .then(result => console.log(result));
