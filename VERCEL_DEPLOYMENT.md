# Vercel Deployment Guide for Secret Arbiter Hub

This guide provides step-by-step instructions for deploying the Secret Arbiter Hub to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, search for `zkEVMlabs/secret-arbiter-hub`
2. Click "Import" next to the repository
3. Vercel will automatically detect it as a Vite project

### 3. Configure Project Settings

1. **Project Name**: `secret-arbiter-hub` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### 4. Environment Variables Configuration

Click "Environment Variables" and add the following:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

**Important**: Make sure to add these variables for all environments (Production, Preview, Development).

### 5. Advanced Configuration (Optional)

If you need custom build settings, create a `vercel.json` file in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will provide you with a deployment URL

### 7. Custom Domain (Optional)

1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Domains" in the sidebar
4. Add your custom domain
5. Follow the DNS configuration instructions

## Post-Deployment Configuration

### 1. Verify Environment Variables

1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Ensure all variables are set for Production environment

### 2. Test the Application

1. Visit your deployment URL
2. Test wallet connection functionality
3. Verify that the app loads correctly
4. Check browser console for any errors

### 3. Update Smart Contract Address

Once you deploy your smart contract to Sepolia testnet:

1. Update the `CONTRACT_ADDRESS` in `src/components/DisputeForm.tsx`
2. Redeploy to Vercel (automatic if connected to GitHub)

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version compatibility
   - Review build logs in Vercel dashboard

2. **Environment Variables Not Working**
   - Verify variables are set for the correct environment
   - Check variable names match exactly (case-sensitive)
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Ensure WalletConnect Project ID is correct
   - Check that RPC URLs are accessible
   - Verify chain ID matches your configuration

4. **404 Errors on Refresh**
   - Add the `vercel.json` configuration above
   - Ensure SPA routing is properly configured

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to project settings
   - Enable "Vercel Analytics" for performance monitoring

2. **Configure Caching**
   - Add appropriate cache headers in `vercel.json`
   - Optimize static assets

## Monitoring and Maintenance

### 1. Deployment Monitoring

- Monitor deployment status in Vercel dashboard
- Set up notifications for failed deployments
- Review build logs regularly

### 2. Performance Monitoring

- Use Vercel Analytics to track performance
- Monitor Core Web Vitals
- Optimize based on real user metrics

### 3. Security

- Regularly update dependencies
- Monitor for security vulnerabilities
- Keep environment variables secure

## Support

For issues with this deployment:

1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review project logs in Vercel dashboard
3. Open an issue in the GitHub repository

## Deployment Checklist

- [ ] Repository imported to Vercel
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Wallet connection tested
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Performance monitoring set up

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Ethereum Sepolia testnet chain ID |
| `NEXT_PUBLIC_RPC_URL` | `https://sepolia.infura.io/v3/...` | RPC endpoint for Sepolia |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | WalletConnect project ID |
| `VITE_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | Vite-specific WalletConnect ID |
| `NEXT_PUBLIC_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Infura API key for RPC access |

---

**Note**: This deployment guide assumes you're using the provided environment variables. For production use, replace with your own secure keys and endpoints.
