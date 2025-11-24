# Gmail Email Setup for Password Reset

## Steps to Enable Email Sending:

### 1. Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to Security → 2-Step Verification
3. Enable 2-Step Verification if not already enabled

### 2. Generate App Password
1. Go to your Google Account → Security
2. Under "Signing in to Google", click "2-Step Verification"
3. Scroll down and click "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Type "Flexify" as the custom name
6. Click "Generate"
7. Copy the 16-character app password (no spaces)

### 3. Update .env File
Open `Flexify-master/server/.env` and add:

```
EMAIL_USER=jairambhumi2025@gmail.com
EMAIL_PASSWORD=your_16_character_app_password_here
FRONTEND_URL=http://localhost:5173
```

**Important**: Replace `your_16_character_app_password_here` with the actual 16-character app password from step 2.

### 4. Restart Server
After updating the .env file, restart your server:
```bash
cd Flexify-master/server
npm run dev
```

## Testing:
1. Go to http://localhost:5173/login/user or /login/provider
2. Click "Forgot Password?"
3. Enter your email
4. Check your email inbox at jairambhumi2025@gmail.com
5. You should receive a password reset email with a link

Note: If email doesn't work, check the server console for detailed error messages.


