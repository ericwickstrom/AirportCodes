# AirportCodes

A web application for learning and testing knowledge of airport IATA codes worldwide.

Currently live at https://airport-codes.vercel.app

## Tech Stack

### Backend
- .NET 8 Web API
- PostgreSQL 16+ with Entity Framework Core
- JWT Authentication

### Frontend
- Vite 6 + React 19 + TypeScript 5.9
- Tailwind CSS v4
- Zustand (state management)
- React Router 7

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 16+](https://www.postgresql.org/download/)

## Setup Instructions

### 1. Database Setup

Create the development database:

```bash
psql -U postgres -c "CREATE DATABASE airportcodes_dev;"
```

### 2. Backend Setup

```bash
cd AirportCodes.API

# Restore dependencies
dotnet restore

# Apply database migrations
dotnet ef database update

# Run the API
dotnet run
```

The API will be available at `https://localhost:7xxx` (check console output for exact port).

### 3. Frontend Setup

```bash
cd AirportCodes.Web

# Install dependencies
npm install

# Run the development server
npm run dev
```

The web app will be available at `http://localhost:5173`.

## Configuration

### Backend Configuration

Update `AirportCodes.API/appsettings.Development.json`:

```json
{
	"ConnectionStrings": {
		"DefaultConnection": "Host=localhost;Database=airportcodes_dev;Username=postgres;Password=your_password"
	}
}
```

### Frontend Configuration

Create `AirportCodes.Web/.env.local` if needed:

```
VITE_API_URL=https://localhost:7xxx
```

## Project Structure

```
AirportCodes/
├── AirportCodes.API/          # Backend Web API
│   ├── Controllers/           # API controllers
│   ├── Data/                  # EF Core DbContext
│   ├── Models/                # Entity models
│   └── Services/              # Business logic
├── AirportCodes.Web/          # Frontend React app
│   └── src/
│       ├── components/        # Reusable components
│       ├── pages/             # Page components
│       ├── stores/            # Zustand stores
│       ├── utils/             # Utility functions
│       └── types/             # TypeScript types
└── Docs/                      # Documentation
