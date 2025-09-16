# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# 🔗 Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID

# 🔌 Wallet Integration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# 🌐 Network Access
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# 🔐 FHE Configuration (Optional)
NEXT_PUBLIC_FHE_NETWORK_URL=https://api.zama.ai
NEXT_PUBLIC_FHE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

> **⚠️ Important**: Replace all placeholder values with your actual API keys and project IDs.

## Variable Descriptions

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum Sepolia testnet chain ID | Yes |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for blockchain access | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID for wallet integration | Yes |
| `VITE_WALLET_CONNECT_PROJECT_ID` | Vite-specific WalletConnect ID | Yes |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key for RPC access | Optional |
| `NEXT_PUBLIC_FHE_NETWORK_URL` | FHEVM network endpoint | Optional |
| `NEXT_PUBLIC_FHE_CONTRACT_ADDRESS` | Deployed smart contract address | Optional |

## Security Notes

- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate API keys regularly
- Keep your WalletConnect Project ID secure
