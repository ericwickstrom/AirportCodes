# AirportCodes Project

## Overview
A learning application to help users memorize IATA airport codes worldwide.

## Platform Strategy
- **Phase 1**: Web application
- **Phase 2**: iOS and Android mobile apps (framework TBD)

## Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS 4.1.x
- **State Management**: Zustand 5.0.8
- **Routing**: React Router 7.x
- **HTTP Client**: Native Fetch API
- **Project**: `AirportCodes.Web`

### Backend
- **Framework**: .NET Core (version TBD)
- **Project**: `AirportCodes.API`

### Database
- **System**: PostgreSQL
- **ORM/Query Builder**: TBD (likely Entity Framework Core or Dapper)

## Project Structure
```
AirportCodes/
├── AirportCodes.sln          # .NET solution file
├── AirportCodes.API/          # Backend API
├── AirportCodes.Web/          # React frontend
├── Docs/                      # Documentation
└── CLAUDE.md                  # Development guidelines
```

## Core Features

### Learning Mode
- Display airport location/name
- Provide 4 multiple-choice IATA code options
- User selects correct code
- Immediate feedback

### Test Mode
- Display airport location/name
- User types 3-letter IATA code
- Validate answer
- Track performance

## Data
- **Initial Source**: User-provided dataset
- **Future**: Pull comprehensive worldwide airport list
- **Data Points** (minimum):
	- IATA code (3 letters)
	- Airport name
	- City/Location
	- Country

## Development Principles
See [CLAUDE.md](../CLAUDE.md) for detailed development philosophy and guidelines.

## Key Decisions

### Architecture
- Monorepo structure chosen for easier development and deployment coordination
- Mobile framework decision deferred until web app is stable

### Frontend Stack Choices
- **React 19.2.0**: Latest stable, includes Actions and improved form handling
- **TypeScript 5.9.3**: Type safety, improved developer experience
- **Vite 7.2.2**: Fast build tool, modern development experience
- **Tailwind CSS 4.1.x**: Utility-first styling, rapid UI development
- **Zustand 5.0.8**: Lightweight state management with minimal boilerplate (chosen over Redux for pragmatism)
- **React Router 7.x**: Non-breaking upgrade from v6, first-class TypeScript support
- **Native Fetch**: Zero dependencies, adequate for our API needs (can upgrade to Axios if needed)

### Development Standards
- Tab indentation for all code (per CLAUDE.md)
- Pragmatic, clean solutions prioritized over complex abstractions
- Minimize dependencies - only add packages when truly needed
