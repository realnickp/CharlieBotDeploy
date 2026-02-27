// generate-pdfs.js - Generate PDFs from HTML guides
const { generateAllPDFs } = require('./pdf-generator');

console.log('🚀 Generating PDF guides...\n');

generateAllPDFs()
  .then(results => {
    console.log('\n✅ PDF Generation Complete');
    console.log('─'.repeat(50));
    results.forEach(result => {
      if (result.success) {
        console.log(`✓ ${result.pdf}`);
      } else {
        console.log(`✗ ${result.pdf} - ${result.error}`);
      }
    });
    console.log('─'.repeat(50));
  })
  .catch(error => {
    console.error('PDF generation failed:', error);
    process.exit(1);
  });
