// email-service.js - Email delivery using Resend with PDF attachments
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * EMAIL DELIVERABILITY BEST PRACTICES:
 * 
 * 1. SPF Record (add to DNS):
 *    Type: TXT
 *    Name: @
 *    Value: v=spf1 include:_spf.resend.com ~all
 * 
 * 2. DKIM (Resend handles this automatically when you verify domain)
 * 
 * 3. DMARC Record (add to DNS):
 *    Type: TXT
 *    Name: _dmarc
 *    Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@legacylinqdigital.com
 * 
 * 4. Use consistent "From" name and email
 * 5. Include unsubscribe link (not needed for transactional)
 * 6. Keep spam score low (avoid spammy words)
 */

// Read PDF file as base64
function getPDFAttachment(pdfPath) {
  try {
    const content = fs.readFileSync(pdfPath);
    return {
      filename: path.basename(pdfPath),
      content: content.toString('base64')
    };
  } catch (error) {
    console.error('Failed to read PDF:', error);
    return null;
  }
}

// Email templates
const templates = {
  customerReceipt: (data, hasAttachment) => ({
    subject: `Your OpenClaw Guide is ready - Order #${data.paymentId.slice(-8)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OpenClaw Guide</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f9fa; padding: 20px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          h1 { color: #ff3333; margin-bottom: 10px; }
          .order-number { color: #666; font-size: 0.9em; margin-bottom: 30px; }
          .product-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #ff3333; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 0.9em; }
          .footer p { margin: 5px 0; }
          .attachment-note { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thanks for your purchase!</h1>
          <p class="order-number">Order #${data.paymentId.slice(-8)}</p>
          
          <p>Hi there,</p>
          
          <div class="product-box">
            <strong>${data.productName}</strong><br>
            Amount: ${data.price}<br>
            Date: ${new Date().toLocaleDateString()}
          </div>
          
          ${hasAttachment ? `
          <div class="attachment-note">
            <strong>📎 Your guide is attached!</strong><br>
            Download the PDF from the attachment below.
          </div>
          ` : `
          <p>Click the button below to access your guide:</p>
          <a href="${data.downloadUrl}" class="button">Access Your Guide</a>
          `}
          
          <div class="footer">
            <p><strong>Questions?</strong> Reply to this email or contact support at info@legacylinqdigital.com</p>
            <p>Keep this email for your records.</p>
            <p>© 2026 Charlie Bot Industries</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Thanks for your purchase!\n\nOrder #${data.paymentId.slice(-8)}\n\nProduct: ${data.productName}\nAmount: ${data.price}\n\n${hasAttachment ? 'Your guide is attached to this email.' : 'Access your guide: ' + data.downloadUrl}\n\nQuestions? Reply to this email or contact info@legacylinqdigital.com`
  }),

  adminNotification: (data) => ({
    subject: `💰 SALE: ${data.productName} ($${data.amount})`,
    html: `
      <h2>🎉 New Sale!</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Product:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.productName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Amount:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">$${data.amount}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.customerEmail}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Payment ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.paymentId}</td></tr>
        <tr><td style="padding: 8px;"><strong>Time:</strong></td><td style="padding: 8px;">${new Date().toLocaleString()}</td></tr>
      </table>
    `,
    text: `New Sale!\n\nProduct: ${data.productName}\nAmount: $${data.amount}\nCustomer: ${data.customerEmail}\nPayment ID: ${data.paymentId}\nTime: ${new Date().toLocaleString()}`
  })
};

// Send customer receipt with PDF attachment
async function sendCustomerReceipt(data, pdfPath = null) {
  try {
    const hasAttachment = pdfPath && fs.existsSync(pdfPath);
    const template = templates.customerReceipt(data, hasAttachment);
    
    const emailOptions = {
      from: 'Charlie Bot <info@legacylinqdigital.com>',
      to: data.customerEmail,
      reply_to: 'mnpdigitalenterprises@gmail.com',
      subject: template.subject,
      html: template.html,
      text: template.text,
      headers: {
        'X-Priority': '1',
        'X-Mailer': 'Charlie Bot Email System',
        'List-Unsubscribe': '<mailto:unsubscribe@legacylinqdigital.com>',
        'Precedence': 'transactional'
      }
    };
    
    // Add PDF attachment if available
    if (hasAttachment) {
      const attachment = getPDFAttachment(pdfPath);
      if (attachment) {
        emailOptions.attachments = [{
          filename: attachment.filename,
          content: attachment.content
        }];
      }
    }
    
    const result = await resend.emails.send(emailOptions);

    console.log('✅ Customer receipt sent:', result.id);
    return { success: true, id: result.id };
  } catch (error) {
    console.error('❌ Failed to send customer receipt:', error);
    return { success: false, error: error.message };
  }
}

// Send admin notification
async function sendAdminNotification(data) {
  try {
    const template = templates.adminNotification(data);
    
    const result = await resend.emails.send({
      from: 'Charlie Bot Sales <sales@legacylinqdigital.com>',
      to: 'mnpdigitalenterprises@gmail.com',
      subject: template.subject,
      html: template.html,
      text: template.text,
      headers: {
        'X-Priority': '1',
        'X-Mailer': 'Charlie Bot Sales System'
      }
    });

    console.log('✅ Admin notification sent:', result.id);
    return { success: true, id: result.id };
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return { success: false, error: error.message };
  }
}

// Handle successful payment
async function handleSuccessfulPayment(paymentData) {
  const { product, customerEmail, paymentId, amount } = paymentData;
  
  // Determine PDF path
  const { getPDFPath } = require('./pdf-generator');
  const pdfPath = getPDFPath(product.id);
  
  // Send customer receipt with PDF attachment
  const customerResult = await sendCustomerReceipt({
    productName: product.name,
    price: `$${(amount / 100).toFixed(2)}`,
    paymentId: paymentId,
    customerEmail: customerEmail,
    downloadUrl: 'https://your-domain.vercel.app/download' // Fallback URL
  }, pdfPath);
  
  // Send admin notification
  const adminResult = await sendAdminNotification({
    productName: product.name,
    amount: (amount / 100).toFixed(2),
    customerEmail: customerEmail,
    paymentId: paymentId
  });
  
  return {
    customerEmail: customerResult,
    adminEmail: adminResult
  };
}

module.exports = {
  sendCustomerReceipt,
  sendAdminNotification,
  handleSuccessfulPayment
};
