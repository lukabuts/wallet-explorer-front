# MetaScan

A minimalistic Ethereum wallet explorer built with React, TypeScript, and Vite. Connect your MetaMask wallet to view balances, ERC20 tokens, and transaction history across multiple chains.

## Features

- Connect / disconnect MetaMask wallet
- Multi-chain support: Ethereum, Polygon, BNB
- Real-time ETH/POL/BNB price via Binance API
- ERC20 token list with on-chain name & symbol resolution
- Transaction history with expandable rows and copy-to-clipboard
- USD value conversion per address
- Persistent wallet state across page refreshes
- Search any wallet address without connecting

## Tech Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router v6**
- **React Query (TanStack)** — data fetching, caching
- **Zustand** — global state + persistence

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension

### Installation

```bash
git clone https://github.com/lukabuts/wallet-explorer-front.git
cd metascan
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

### Run

```bash
npm run dev
```

## Supported Chains

| Chain    | Native Token | 
|----------|-------------|
| Ethereum | ETH         |
| Polygon  | POL         |
| BNB      | BNB         |

## Notes

- MetaMask is required to connect a wallet. The app will show an error if it is not installed.
- Searching an address does not require a wallet connection.
- Chain selection is synced to the URL as a search param so links are shareable.
- Data is cached indefinitely (`staleTime: Infinity`) to avoid unnecessary Alchemy API calls.