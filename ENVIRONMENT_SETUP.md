# Environment Variables Setup for PhonePe Integration

## Server Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=4000
MONGO_URI=mongodb://localhost:27017/flexify
JWT_SECRET=your_jwt_secret_here
CLIENT_ORIGIN=http://localhost:5173
SERVER_URL=http://localhost:4000

# Razorpay Configuration (Get credentials from https://razorpay.com)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# PhonePe Configuration (Demo Credentials) - Optional
PHONEPE_MERCHANT_ID=PGTESTPAYUAT
PHONEPE_SALT_KEY=099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
PHONEPE_SALT_INDEX=1
PHONEPE_ENVIRONMENT=UAT
```

## Client Environment Variables

Create a `.env` file in the `client` directory with the following variables:

```env
VITE_API_BASE=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Razorpay Setup Instructions

**To enable payment functionality, you need to configure Razorpay:**

1. **Get Razorpay Credentials:**
   - Sign up at [Razorpay Dashboard](https://razorpay.com/)
   - Go to Settings → API Keys
   - Generate Test API Keys (or Live keys for production)
   - Copy your Key ID and Key Secret

2. **Configure Environment Variables:**
   - Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to your server `.env` file
   - Add `REACT_APP_RAZORPAY_KEY_ID` to your client `.env` file

3. **Test Credentials (for development):**
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_test_secret_key
   ```

4. **Test Payment Flow:**
   - Use Razorpay test card: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)
   - Or use UPI: `success@razorpay`

## PhonePe Demo Setup Instructions

**✅ DEMO CREDENTIALS PROVIDED - NO REGISTRATION NEEDED!**

The code is pre-configured with PhonePe's test credentials for immediate demonstration:

- **Merchant ID:** `PGTESTPAYUAT`
- **Salt Key:** `099eb0cd-02cf-4e2a-8aca-3e6c6aff0399`
- **Salt Index:** `1`
- **Environment:** `UAT` (Sandbox)

**Test Payment Methods:**
- **Credit Card:** `4208585190116667` (Exp: 06/2027, CVV: 508)
- **Debit Card:** `4242424242424242` (Exp: 12/2023, CVV: 936)
- **Net Banking:** Bank ID: `SBIN`, Username: `test`, Password: `test`
- **OTP:** Use `123456` for any OTP verification

**For Production:**
1. Register with [PhonePe Business Portal](https://business.phonepe.com/)
2. Get live credentials and update environment variables
3. Set `PHONEPE_ENVIRONMENT=PROD`

## Testing the Integration

1. **Start the server:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start the client:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Test the payment flow:**
   - Create a booking as a user
   - As a provider, mark the booking as completed
   - As a user, click "Pay Now" on the completed booking
   - You'll be redirected to PhonePe sandbox for payment
   - Use the test payment methods provided above
   - Complete payment and return to your app

## Quick Test Commands

```bash
# Terminal 1 - Start Server
cd server
npm install
npm run dev

# Terminal 2 - Start Client  
cd client
npm install
npm run dev
```

**Demo Flow:**
1. Go to `http://localhost:5173`
2. Register/Login as user
3. Create a booking
4. Login as provider and mark booking completed
5. Login as user and click "Pay Now"
6. Use test card: `4208585190116667` (Exp: 06/2027, CVV: 508)
7. Complete payment and see success page

## Important Notes

- PhonePe requires HTTPS in production
- Test with PhonePe's UAT environment first
- Ensure your callback URL is accessible from PhonePe's servers
- Keep your Salt Key secure and never expose it in client-side code
