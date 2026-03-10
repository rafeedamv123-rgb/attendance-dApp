# Attendance dApp

A blockchain-based attendance app. Teachers open and close attendance sessions per course; students mark attendance within the open window. All on-chain and verifiable.

## Features

- **Connect wallet** — MetaMask (or any Ethereum-compatible wallet)
- **Teacher** — Open attendance for a course with a duration (seconds), or close the session
- **Student** — Enter course code and mark attendance (only while the session is open)
- **Role detection** — The app checks if the connected address is the contract’s teacher
- **UI** — Dark theme, toasts for feedback, loading states, and responsive layout

## Tech stack

- **React 19** + **Vite 7**
- **ethers v6** — Wallet connection and contract calls
- Plain CSS with design tokens (no Tailwind)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MetaMask](https://metamask.io/) (or another EVM wallet) in your browser

## Setup and run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

## Build and deploy

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (uses gh-pages)
npm run deploy
```

## Project structure

```
src/
├── App.jsx          # Root: wallet, role, tabs, contract handlers
├── teacher.jsx      # Teacher UI (open/close attendance)
├── student.jsx      # Student UI (mark attendance)
├── components/      # Button, Input, Card, Toast
├── hooks/           # useContract (ethers contract helpers)
├── styles/         # variables.css (design tokens)
├── utils/           # format.js (truncateAddress, copyToClipboard)
├── abi.json         # Contract ABI
└── index.css        # Global styles
```

## Contract

The app talks to a single deployed contract. The teacher address and course sessions are stored on-chain. Contract address is set in `src/hooks/useContract.js`.

## License

MIT
