# Will's Brix

## About this repository
The official repository of [willsbrix.com](https://willsbrix.com)! This repository contains a lot of efficiency changes to the [older repository](https://github.com/nevthereal/willsbrix-v2), like for example using Vite instead of CRA, loading individual items dynamically and not hardcode every single Route and much more. I previously used Paypal buttons to handle checkouts and payments, which I didn't really like, because I wanted to code the card by myself, so I switched to Stripe and implemented a Cart functionality and used an Express server to handle the transactions.

## Technologies used
### Frontend
- Vite + React
- TailwindCSS
- Font Awesome (Icons)
- Framer-Motion
### Backend
- Firebase
- Node.js
- Express
- Stripe
- CORS
- dotenv
