module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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
};
