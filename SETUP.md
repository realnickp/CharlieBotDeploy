# Setup Instructions

## Step 1: Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in `.env`:
   - Get Square credentials from: https://developer.squareup.com/
   - Generate new access token (production)
   - Add your location ID

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Run Locally

```bash
npm start
```

Server will start on http://localhost:3000

## Step 4: Test Payment Flow

1. Visit http://localhost:3000/checkout.html?product=quickstart
2. Enter test card details (use Square test cards in sandbox mode)
3. Complete payment
4. Should redirect to success page with download

## Step 5: Deploy to Vercel

1. Push to GitHub (don't commit .env!)
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard:
   - SQUARE_ACCESS_TOKEN
   - SQUARE_APPLICATION_ID
   - SQUARE_LOCATION_ID
   - SQUARE_ENVIRONMENT=production

4. Deploy!

## Important Security Notes

- NEVER commit `.env` to GitHub
- NEVER commit `node_modules/`
- Regenerate Square token if it was ever exposed
- Use production Square credentials only on production site

## Testing

Use Square test cards in sandbox mode:
- Card: 4111 1111 1111 1111
- Exp: Any future date
- CVV: Any 3 digits
- ZIP: Any 5 digits
