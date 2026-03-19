# 📦 Subscription Tracker API

A production-ready RESTful API for managing user subscriptions — built with **Node.js**, **Express**, **MongoDB**, and integrated with **Arcjet** for security and **Upstash** for automated email workflows.

> Built following the [JavaScript Mastery Backend Course](https://youtu.be/rOpEN1JDaD0)

---

## 🚀 Features

- 🔐 **JWT Authentication & Authorization** — Secure sign-up, login, and protected routes
- 👤 **User Management** — Create and retrieve user profiles
- 📋 **Subscription CRUD** — Full subscription lifecycle management (create, read, update, delete)
- 🧮 **Auto Renewal Date Calculation** — Renewal dates auto-computed from frequency if not provided
- ✅ **Input Validation** — Schema-level validation using Mongoose (enum, required, custom validators)
- 🛡️ **Rate Limiting & Bot Protection** — Powered by [Arcjet](https://arcjet.com)
- 📧 **Automated Email Reminders** — Upstash Workflows trigger renewal reminder emails 7 days before renewal
- ⚠️ **Global Error Handling** — Centralized middleware handles CastError, duplicate keys, and validation errors
- 🌐 **VPS Deployment** — Deployed on Hostinger VPS with full Linux server control

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Security | Arcjet (rate limiting, bot protection) |
| Workflows | Upstash (scheduled email reminders) |
| Dev Tools | Nodemon, ESLint |
| Deployment | Hostinger VPS |

---

## 📁 Project Structure
subscription-tracker/
├── app.js # Express app entry point
├── config/
│ └── env.js # Environment variable config
├── models/
│ ├── user.model.js # User schema
│ └── subscription.model.js # Subscription schema with pre-save hook
├── routes/
│ ├── auth.routes.js # Sign-up / Sign-in routes
│ ├── user.routes.js # User profile routes
│ └── subscription.routes.js # Subscription CRUD routes
├── controllers/
│ ├── auth.controller.js
│ ├── user.controller.js
│ └── subscription.controller.js
├── middlewares/
│ ├── auth.middleware.js # JWT verification
│ ├── arcjet.middleware.js # Rate limiting & bot protection
│ └── error.middleware.js # Global error handler
├── workflows/
│ └── subscription.workflow.js # Upstash reminder workflow
└── package.json

text

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- [Upstash](https://upstash.com) account
- [Arcjet](https://arcjet.com) account

### Installation

```bash
git clone https://github.com/<your-username>/subscription-tracker.git
cd subscription-tracker
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5500
NODE_ENV=development

# MongoDB
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/subscription-tracker

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d

# Arcjet
ARCJET_KEY=your_arcjet_api_key

# Upstash
QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=your_qstash_token

# Email (for workflows)
EMAIL_ADDRESS=your@email.com
```

### Run Locally

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/sign-up` | Register a new user |
| POST | `/api/v1/auth/sign-in` | Login and get JWT |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/api/v1/users` | Get all users | ✅ |
| GET | `/api/v1/users/:id` | Get user by ID | ✅ |

### Subscriptions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| POST | `/api/v1/subscriptions` | Create a subscription | ✅ |
| GET | `/api/v1/subscriptions` | Get all subscriptions | ✅ |
| GET | `/api/v1/subscriptions/:id` | Get subscription by ID | ✅ |
| PUT | `/api/v1/subscriptions/:id` | Update a subscription | ✅ |
| DELETE | `/api/v1/subscriptions/:id` | Delete a subscription | ✅ |

---

## 📧 Subscription Reminder Workflow

When a subscription is created, an **Upstash Workflow** is triggered that:

1. Waits until **7 days before** the renewal date
2. Sends a reminder email with subscription details and payment method
3. Sends follow-up reminders at 5 days, 2 days, and 1 day before renewal

---

## 🛡️ Security

- All routes except sign-up/sign-in require a valid **Bearer JWT** in the `Authorization` header
- **Arcjet** enforces rate limiting — repeated requests trigger a `429 Too Many Requests` response
- Bot detection blocks automated scanners from accessing your API

---

## 🚢 Deployment

This API is deployed on a **Hostinger VPS** with:

- Ubuntu Linux OS
- Node.js process managed via `pm2`
- Reverse proxy via **Nginx**
- SSL via Let's Encrypt

---

## 📌 Key Learnings

- JWT authentication flow end-to-end
- Mongoose schema design with validators and pre-save hooks
- Global error middleware handling `CastError`, `ValidationError`, and duplicate key errors
- Automated workflows with Upstash QStash
- Production deployment on a Linux VPS

---

## 📄 License

MIT License — free to use and modify.