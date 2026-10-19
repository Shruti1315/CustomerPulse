# CustomerPulse RFM Analytics

CustomerPulse is a student-project MVP for small businesses. It stores customers and purchases, calculates Recency/Frequency/Monetary metrics, assigns understandable segments, and recommends simple retention actions.

## Features
- Registration and login using JWT and bcrypt password hashing
- Customer CRUD and search
- Purchase entry and history
- Automatic RFM metrics and relative quintile scores
- Segments: Champions, Loyal Customers, Potential Loyalists, At Risk, Inactive, Regular
- Dashboard metrics and customer-segment chart
- Segment-specific campaign drafts (no messages are actually sent)
- CSV report export

## Requirements
- Node.js 20+ recommended
- MongoDB Community Server or a MongoDB Atlas connection string

## Quick start
1. Copy `.env.example` to `backend/.env` (or copy the values into `backend/.env`) and set a unique `JWT_SECRET` of at least 24 characters.
2. Ensure MongoDB is running and set `MONGODB_URI`.
3. In one terminal: `cd backend`, `npm install`, `npm run dev`.
4. In another terminal: `cd frontend`, `npm install`, `npm run dev`.
5. Open `http://localhost:5173` and create a workspace account.

See [SETUP.md](SETUP.md) for detailed instructions.

## API overview
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET/POST | `/api/customers` | List/create customers |
| PUT/DELETE | `/api/customers/:id` | Update/delete customer |
| GET/POST | `/api/purchases` | List/create purchases |
| DELETE | `/api/purchases/:id` | Delete purchase |
| GET | `/api/analytics/dashboard` | Dashboard statistics |
| GET | `/api/analytics/rfm` | RFM results and recommendations |
| GET/POST | `/api/campaigns` | List/create campaign drafts |
| PATCH | `/api/campaigns/:id/status` | Update campaign status |

All customer, purchase, analytics and campaign routes require `Authorization: Bearer <token>`. Each query is scoped to the authenticated account.

## RFM notes
RFM scores use relative quintiles from the current account's customers, so scores may change when the dataset changes. Recency is reversed (a smaller number of days receives a better score). Customers without purchases are explicitly marked Inactive. Segment thresholds are simple MVP rules and should be adjusted to the shop's normal purchase cycle.

## Security and limitations
- Never commit `.env` files or production secrets.
- Configure a strong JWT secret and restrict database network access.
- JWT is stored in browser localStorage in this demo; consider secure, httpOnly cookies and CSRF protections before production use.
- This is an MVP, not a security-audited production application. Add automated integration tests, stricter schema validation, pagination, backups, and deployment hardening before real customer data is used.
- Campaigns are stored as workflow drafts only; WhatsApp/SMS/email delivery is not integrated.
