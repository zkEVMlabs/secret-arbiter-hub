# Secret Arbiter Hub

A decentralized arbitration platform built with FHE (Fully Homomorphic Encryption) technology for secure and private dispute resolution.

## Features

- **FHE-Encrypted Dispute Resolution**: All sensitive data is encrypted using fully homomorphic encryption
- **Multi-Wallet Support**: Connect with RainbowKit, MetaMask, WalletConnect, and more
- **Decentralized Arbitration**: Transparent and secure dispute resolution process
- **Privacy-First Design**: User data remains encrypted throughout the arbitration process
- **Smart Contract Integration**: Automated execution of arbitration decisions

## Technology Stack

This project is built with:

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHEVM

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```sh
# Clone the repository
git clone https://github.com/zkEVMlabs/secret-arbiter-hub.git

# Navigate to the project directory
cd secret-arbiter-hub

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

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

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your preferred wallet
2. **Create Dispute**: Submit a new dispute with encrypted details
3. **Arbitration Process**: Participate in the secure arbitration process
4. **Resolution**: Receive encrypted arbitration results

## Smart Contract

The project includes FHE-enabled smart contracts for:
- Dispute creation and management
- Encrypted data storage
- Automated arbitration execution
- Secure fund distribution

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── WalletConnect.tsx
├── config/             # Configuration files
│   └── wagmi.ts        # Wagmi configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Page components
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.
