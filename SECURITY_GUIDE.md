# 🔐 Security Configuration Guide

## API Keys and Sensitive Data

This project requires several API keys and configuration values. **Never commit real API keys to version control.**

### Required API Keys

1. **Infura API Key**
   - Get from: [Infura Dashboard](https://infura.io/dashboard)
   - Used for: Ethereum RPC access
   - Environment variable: `NEXT_PUBLIC_INFURA_API_KEY`

2. **WalletConnect Project ID**
   - Get from: [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Used for: Wallet connection functionality
   - Environment variable: `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

### Configuration Steps

1. **Create Environment File**
   ```bash
   cp .env.example .env.local
   ```

2. **Replace Placeholder Values**
   ```env
   # Replace these placeholders with your actual values
   NEXT_PUBLIC_INFURA_API_KEY=your_actual_infura_key_here
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_actual_walletconnect_id_here
   ```

3. **Verify Configuration**
   ```bash
   npm run dev
   ```

### Security Best Practices

- ✅ Use environment variables for all sensitive data
- ✅ Never commit `.env.local` to git
- ✅ Use different keys for development and production
- ✅ Rotate API keys regularly
- ✅ Monitor API key usage
- ❌ Don't hardcode API keys in source code
- ❌ Don't share API keys in chat or email
- ❌ Don't use production keys in development

### Production Deployment

For production deployment (Vercel, Netlify, etc.):

1. Add environment variables in your deployment platform
2. Use production-grade API keys
3. Enable rate limiting and monitoring
4. Set up proper CORS policies

### Troubleshooting

**Common Issues:**
- `Invalid API key`: Check your Infura project ID
- `WalletConnect error`: Verify your Project ID
- `Network error`: Ensure RPC URL is correct

**Getting Help:**
- Check the [Environment Setup Guide](./ENVIRONMENT_SETUP.md)
- Review the [Deployment Guide](./VERCEL_DEPLOYMENT.md)
- Open an issue on GitHub for support
