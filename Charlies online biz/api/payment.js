const { createPayment } = require('../square-integration');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sourceId, productKey, email } = req.body;
    
    // Validate required fields
    if (!sourceId || !productKey || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sourceId, productKey, email'
      });
    }
    
    // Process payment
    const result = await createPayment(sourceId, productKey, email);
    
    if (result.success) {
      res.json({
        success: true,
        paymentId: result.paymentId,
        status: result.status,
        receiptUrl: result.receiptUrl,
        product: result.product
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Payment endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
