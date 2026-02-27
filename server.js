const express = require('express');
const cors = require('cors');
const path = require('path');
const { createPayment, verifyPayment } = require('./square-integration');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.SQUARE_ENVIRONMENT || 'not set'
  });
});

// Square config endpoint (for frontend)
app.get('/api/square-config', (req, res) => {
  const isProduction = process.env.SQUARE_ENVIRONMENT === 'production';
  res.json({
    applicationId: isProduction 
      ? process.env.SQUARE_APPLICATION_ID 
      : process.env.SQUARE_SANDBOX_APPLICATION_ID,
    locationId: isProduction 
      ? process.env.SQUARE_LOCATION_ID 
      : process.env.SQUARE_SANDBOX_LOCATION_ID,
    environment: isProduction ? 'production' : 'sandbox'
  });
});

// Create payment endpoint
app.post('/api/payment', async (req, res) => {
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
});

// Verify payment endpoint
app.get('/api/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const result = await verifyPayment(paymentId);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Verify endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PDF Download endpoint
app.get('/api/download/:product', (req, res) => {
  const { product } = req.params;
  const { email, payment } = req.query;
  
  // Map product to PDF file
  const pdfFiles = {
    'quick-start-guide': 'OpenClaw-Quick-Start-Guide.pdf',
    'full-system-guide': 'OpenClaw-Full-System-Guide.pdf',
    'quickstart': 'OpenClaw-Quick-Start-Guide.pdf',
    'fullsystem': 'OpenClaw-Full-System-Guide.pdf'
  };
  
  const pdfFile = pdfFiles[product];
  
  if (!pdfFile) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const filePath = path.join(__dirname, pdfFile);
  
  // Check if file exists
  if (!require('fs').existsSync(filePath)) {
    console.error('PDF not found:', filePath);
    return res.status(404).json({ error: 'PDF file not found' });
  }
  
  // Set headers for download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${pdfFile}"`);
  
  // Stream the file
  const fileStream = require('fs').createReadStream(filePath);
  fileStream.pipe(res);
  
  console.log(`📥 Download: ${pdfFile} by ${email || 'unknown'}`);
});

// Only start server if not on Vercel (local development)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Charlie Bot's OpenClaw Guide server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`💳 Payment endpoint: http://localhost:${PORT}/api/payment`);
  });
}

// Export for Vercel
module.exports = app;
