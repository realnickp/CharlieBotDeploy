// pdf-generator.js - Convert HTML guides to PDF
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePDF(inputFile, outputFile) {
  console.log(`Generating PDF from ${inputFile}...`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Load HTML file
    const filePath = path.resolve(inputFile);
    await page.goto('file://' + filePath, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Generate PDF
    await page.pdf({
      path: outputFile,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    console.log(`✅ PDF created: ${outputFile}`);
    return { success: true, path: outputFile };
  } catch (error) {
    console.error('PDF generation failed:', error);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

// Generate all product PDFs
async function generateAllPDFs() {
  const products = [
    { html: 'QUICK-START-COMPLETE.html', pdf: 'OpenClaw-Quick-Start-Guide.pdf' },
    { html: 'FULL-SYSTEM-COMPLETE.html', pdf: 'OpenClaw-Full-System-Guide.pdf' }
  ];
  
  const results = [];
  for (const product of products) {
    const result = await generatePDF(product.html, product.pdf);
    results.push({ ...product, ...result });
  }
  
  return results;
}

// Get PDF path for product
function getPDFPath(productKey) {
  const pdfs = {
    quickstart: 'OpenClaw-Quick-Start-Guide.pdf',
    fullsystem: 'OpenClaw-Full-System-Guide.pdf'
  };
  return pdfs[productKey];
}

module.exports = {
  generatePDF,
  generateAllPDFs,
  getPDFPath
};
