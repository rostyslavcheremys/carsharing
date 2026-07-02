# Carsharing

A full-stack carsharing platform built with React and Firebase. The application serves two interfaces based on user role — an interactive map-based booking flow for end users and a comprehensive admin dashboard for fleet and operations management.

## Features

### User Interface
- Interactive Google Maps with real-time car availability and custom light/dark themes
- Full booking flow — select period, payment, confirmation, and history
- Full trip flow — start, car condition inspection, active monitoring, access control, end condition, payment, and summary
- Driver verification with document/license upload
- User profile management
- Light and dark theme support

### Admin Dashboard
- Fleet management — add, edit, and view cars with image galleries
- Car condition reports submitted by users at trip start/end
- Booking and trip monitoring with detailed views
- User management and verification status tracking
- Analytics dashboard with bar, line, and pie charts for cars, bookings, and trips
- Real-time fleet monitoring

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7 |
| UI | Material-UI (MUI) 7, Emotion |
| Routing | React Router DOM 7 |
| Forms | React Hook Form 7 |
| Backend | Firebase (Firestore, Auth, Storage) |
| Cloud Functions | Firebase Functions (Node.js 20) |
| Maps | Google Maps API (`@react-google-maps/api`) |
| Date handling | Day.js |
| Image processing | Browser Image Compression |
| Testing | Jest (cloud functions) |

## Project Structure

```
carsharing/
├── src/
│   ├── pages/
│   │   ├── admin/             # Admin dashboard pages (cars, bookings, trips, users)
│   │   ├── auth/              # Login, register, driver verification
│   │   └── user/              # Booking flow, trip flow, map, profile
│   ├── components/            # Reusable UI components (tables, dialogs, forms, charts, map)
│   ├── routes/                # AppRoutes, AuthRoutes, UserRoutes, AdminRoutes
│   ├── layouts/               # AdminLayout, UserLayout, AuthLayout
│   ├── services/              # Firestore service layer (Car, Booking, Trip, User, etc.)
│   ├── hooks/                 # Custom hooks (useAuth, useCollection, useDocument, map hooks)
│   ├── context/               # Auth, Theme, and Date context providers
│   ├── guards/                # ProtectedRoute and PublicRoute components
│   ├── constants/             # Route definitions, table configs, form defaults
│   ├── utils/                 # Formatters, validators, Firebase helpers, map utilities
│   ├── styles/                # Global styles, Google Maps JSON themes
│   └── firebase/              # Firebase initialization and config
├── cloud-functions/           # Firebase Cloud Functions
│   ├── auth/                  # Delete user data on account deletion
│   ├── bookings/              # Scheduled cancellation of expired bookings
│   └── index.js
├── firebase.json              # Firebase hosting and functions configuration
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 20+
- Firebase project with Firestore, Auth, Storage, and Functions enabled
- Google Maps API key with Maps JavaScript API enabled

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd carsharing

# Install frontend dependencies
npm install

# Install cloud functions dependencies
cd cloud-functions
npm install
cd ..
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Firebase
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=
VITE_MAP_LIGHT=
VITE_MAP_DARK=
```

`VITE_MAP_LIGHT` and `VITE_MAP_DARK` are Google Maps Cloud-hosted map style IDs for light and dark themes respectively.

### Development

```bash
# Start the development server
npm run dev

# Start Firebase emulators (from cloud-functions/)
cd cloud-functions
npm run serve
```

### Build & Deploy

```bash
# Build the frontend
npm run build

# Preview the production build locally
npm run preview

# Deploy cloud functions
cd cloud-functions
npm run deploy
```

### Linting & Tests

```bash
# Lint frontend
npm run lint

# Lint and test cloud functions
cd cloud-functions
npm run lint
npm run test
```

## Firebase Collections

| Collection | Description |
|---|---|
| `users` | User profiles, role, and driver verification status |
| `cars` | Fleet vehicles with images, pricing, and specs |
| `bookings` | Reservations with dates, status, and payment info |
| `trips` | Active and completed trips with route data |
| `carConditions` | Condition reports (fuel level, mileage, damage photos) submitted at trip start and end |

## Cloud Functions

- **onUserDeleted** — Triggered when a Firebase Auth user is deleted; cleans up associated Firestore data.
- **cancelExpiredBookings** — Scheduled function that automatically cancels bookings past their expiry date.

## Routes

### Auth (public)
| Path | Page |
|---|---|
| `/auth/login` | Login |
| `/auth/register` | Registration |
| `/auth/driver-verification` | Driver license/document upload |

### User (authenticated)
| Path | Page |
|---|---|
| `/` | Home |
| `/map` | Interactive car map |
| `/profile/:id` | User profile |
| `/profile/:id/edit` | Edit profile |
| `/booking/:id/date` | Select booking period |
| `/booking/:id/payment` | Booking payment |
| `/booking/:id/confirm` | Booking confirmation |
| `/booking/history` | Booking history |
| `/trip/:id/start` | Start trip |
| `/trip/:id/condition-start` | Pre-trip condition check |
| `/trip/:id` | Active trip |
| `/trip/:id/access` | Car access/unlock |
| `/trip/:id/condition-end` | Post-trip condition check |
| `/trip/:id/payment` | Trip payment |
| `/trip/:id/summary` | Trip summary |
| `/trip/history` | Trip history |

### Admin (admin role required)
| Path | Page |
|---|---|
| `/admin/dashboard` | Analytics and charts |
| `/admin/monitoring` | Real-time fleet monitoring |
| `/admin/cars` | Car list |
| `/admin/cars/add` | Add new car |
| `/admin/cars/:id` | Car details |
| `/admin/cars/:id/edit` | Edit car |
| `/admin/car-conditions/:id` | Car condition reports |
| `/admin/users` | User list |
| `/admin/users/:id` | User details |
| `/admin/bookings` | Booking list |
| `/admin/bookings/:id` | Booking details |
| `/admin/trips` | Trip list |
| `/admin/trips/:id` | Trip details |
