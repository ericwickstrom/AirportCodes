# AirportCodes Development Roadmap

## Overview
This roadmap outlines the phases to build the AirportCodes application from an empty directory to a production-ready MVP.

---

## Phase 1: Project Setup & Infrastructure

### 1.1 Backend Setup
- [x] Create .NET 8 solution file (`AirportCodes.sln`)
- [x] Create ASP.NET Core Web API project (`AirportCodes.API`)
- [x] Configure project structure (Controllers, Models, Services, Data)
- [x] Install required NuGet packages:
	- Entity Framework Core 8.x
	- Npgsql.EntityFrameworkCore.PostgreSQL
	- Microsoft.AspNetCore.Authentication.JwtBearer
	- Swagger/OpenAPI tools (built-in to Web API template)
- [x] Configure appsettings.json (dev/prod configurations)
- [x] Set up logging configuration

### 1.2 Frontend Setup
- [x] Create Vite + React + TypeScript project (`AirportCodes.Web`)
- [x] Install required npm packages:
	- React 19.2.0
	- TypeScript 5.9.3
	- Vite 6.0.0 (instead of 7.2.2 due to @tailwindcss/vite compatibility)
	- Tailwind CSS 4.1.x + @tailwindcss/vite
	- Zustand 5.0.8
	- React Router 7.x
- [x] Configure Vite (plugins, build settings)
- [x] Configure Tailwind CSS v4
- [x] Set up project structure (components, pages, stores, utils, types)
- [x] Configure TypeScript (tsconfig.json)

### 1.3 Database Setup
- [x] Install PostgreSQL 16/17 locally or via Docker
- [x] Create development database
- [x] Configure connection strings
- [x] Set up EF Core migrations infrastructure

### 1.4 Development Environment
- [x] Update .gitignore for .NET and Node.js
- [x] Create README.md with setup instructions
- [x] Set up environment variables (.env files)
- [x] Configure CORS for local development

---

## Phase 2: Database & Data Models

### 2.1 Database Schema Design
- [x] Design Airport entity model
	- Id (Primary Key) (GUID)
	- IATA Code (3 letters, unique, indexed)
	- Airport Name (string)
	- City (string)
	- Country (string)
- [x] Design User entity model (for auth)
	- Id (Primary Key) GUID
	- Email (string)
	- PasswordHash (string)
	- DateCreated (datetime)
	- DateUpdated (datetime)
	- LastLogin (datetime)

### 2.2 EF Core Implementation
- [x] Create DbContext class
- [x] Create entity classes with data annotations
- [x] Configure entity relationships
- [x] Create initial migration
- [x] Apply migration to development database

### 2.3 Seed Data
- [x] Import initial airport data (user-provided dataset)
- [x] Create seed data script
- [x] Validate data integrity

---

## Phase 3: Backend API Development

### 3.1 Authentication & Authorization
- [x] Implement JWT token generation
- [x] Create user registration endpoint
- [x] Create user login endpoint
- [x] Create token refresh mechanism
- [x] Add JWT authentication middleware
- [x] Implement password hashing (ASP.NET Core Identity)

### 3.2 Airport Data API
- [X] Create Airport controller
- [X] GET /api/airports - Get all airports (paginated)
- [X] GET /api/airports/{id} - Get single airport
- [X] GET /api/airports/random - Get random airport(s) for quiz
- [X] Create Airport service layer
- [ ] Add caching for frequently accessed data

### 3.3 Quiz/Learning API
- [x] Create Quiz controller
- [x] GET /api/quiz/learning - Get learning mode question (1 correct + 3 random options)
- [x] POST /api/quiz/learning/answer - Validate learning mode answer
- [x] POST /api/quiz/test/start - Start test session
- [x] GET /api/quiz/test/{sessionId}/question - Get test question (no duplicates per session)
- [x] POST /api/quiz/test/answer - Submit test answer with immediate feedback
- [x] GET /api/quiz/test/{sessionId}/results - Get final test results with score percentage
- [x] Create quiz logic service (generate distractors, validate answers)

### 3.4 User Progress API
- [ ] Create UserProgress controller
- [ ] GET /api/progress - Get user's progress/statistics
- [ ] POST /api/progress - Update user progress after quiz
- [ ] GET /api/progress/stats - Get overall statistics

### 3.5 API Documentation
- [ ] Configure Swagger/OpenAPI
- [ ] Document all endpoints
- [ ] Add XML comments to controllers

---

## Phase 4: Frontend Development

### 4.1 Core Infrastructure
- [x] Set up React Router routes
- [x] Create layout components (Header, Footer, Navigation)
- [x] Create Zustand stores:
	- Auth store (user, token, login/logout)
	- Quiz store (current question, score, progress)
	- Settings store (preferences)
- [x] Create API service utilities (fetch wrappers)
- [x] Create TypeScript types/interfaces for API models

### 4.2 Authentication UI
- [x] Create Login page (placeholder)
- [x] Create Registration page (placeholder)
- [ ] Create authentication form components
- [x] Implement protected routes
- [x] Add token storage (localStorage)
- [ ] Add auto-logout on token expiration

### 4.3 Learning Mode
- [x] Create Learning Mode page
- [x] Display airport location/name
- [x] Show 4 multiple choice options
- [x] Implement answer selection logic
- [x] Show immediate feedback (correct/incorrect)
- [x] Add "Next Question" button
- [x] Track score during session
- [x] Add progress indicator

### 4.4 Test Mode
- [x] Create Test Mode page
- [x] Display airport location/name
- [x] Create text input for IATA code
- [x] Implement answer validation (3 letters, uppercase)
- [x] Show immediate feedback
- [x] Add "Next Question" button
- [x] Track score during session
- [ ] Add timer (optional)

### 4.5 User Dashboard
- [ ] Create Dashboard page
- [ ] Display user statistics
- [ ] Show learning progress (airports mastered vs remaining)
- [ ] Show recent quiz history
- [ ] Add data visualization (charts/graphs)

### 4.6 Navigation & UX
- [x] Create Home/Landing page
- [x] Create mode selection interface
- [x] Add navigation menu
- [x] Implement responsive design (mobile-first)
- [x] Add loading states
- [x] Add error handling UI
- [ ] Create 404 page

### 4.7 Authentication Forms
- [ ] Create login form component
- [ ] Add email and password input fields
- [ ] Implement form validation (email format, password requirements)
- [ ] Add error handling for failed login attempts
- [ ] Show loading state during authentication
- [ ] Create registration form component
- [ ] Add email, password, and confirm password fields
- [ ] Implement password strength validation
- [ ] Add error handling for registration failures (duplicate email, etc.)
- [ ] Redirect to dashboard after successful login/registration
- [ ] Add "Forgot Password" link (placeholder for future)

---

## Phase 5: Integration & Testing

### 5.1 API Integration
- [ ] Connect frontend to backend API
- [ ] Test all API endpoints from frontend
- [ ] Handle API errors gracefully
- [ ] Implement retry logic for failed requests
- [ ] Add request/response interceptors for auth tokens

### 5.2 Testing
- [ ] Manual testing of all user flows
- [ ] Test authentication flows
- [ ] Test quiz modes (learning & test)
- [ ] Test progress tracking
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Test with various dataset sizes

### 5.3 Bug Fixes & Refinements
- [ ] Fix identified bugs
- [ ] Optimize performance bottlenecks
- [ ] Improve UX based on testing feedback
- [ ] Add loading indicators where needed
- [ ] Improve error messages

---

## Phase 6: Polish & MVP Features

### 6.1 UX Enhancements
- [ ] Add animations/transitions (subtle)
- [ ] Improve visual feedback for correct/incorrect answers
- [ ] Add sound effects (optional, toggleable)
- [ ] Polish UI with Tailwind components
- [ ] Add keyboard shortcuts for quiz navigation
- [ ] Implement dark mode (optional)

### 6.2 Data Enhancements
- [ ] Research comprehensive worldwide airport data source
- [ ] Plan data import/update strategy
- [ ] Add data validation
- [ ] Handle duplicate/conflicting data

### 6.3 Settings & Preferences
- [ ] Create Settings page
- [ ] Add quiz difficulty settings (filter by region, airport size, etc.)
- [ ] Add accessibility options
- [ ] Allow users to customize quiz length

---

## Phase 7: Deployment Preparation

### 7.1 Backend Deployment
- [ ] Create production appsettings.json
- [ ] Configure production database
- [ ] Set up database migrations for production
- [ ] Configure production logging
- [ ] Set up health check endpoints
- [ ] Choose hosting platform (Azure, AWS, etc.)
- [ ] Create deployment scripts/CI-CD pipeline

### 7.2 Frontend Deployment
- [ ] Configure production build settings
- [ ] Optimize bundle size
- [ ] Configure environment variables for production
- [ ] Choose hosting platform (Vercel, Netlify, Azure Static Web Apps, etc.)
- [ ] Set up CDN for static assets
- [ ] Configure production API URLs

### 7.3 DevOps
- [ ] Set up production database (PostgreSQL)
- [ ] Configure SSL certificates
- [ ] Set up monitoring/logging (Application Insights, etc.)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Create deployment documentation

---

## Phase 8: MVP Launch

### 8.1 Pre-Launch
- [ ] Final end-to-end testing in production environment
- [ ] Security audit
- [ ] Performance testing
- [ ] Create user documentation/help section
- [ ] Prepare privacy policy and terms of service

### 8.2 Launch
- [ ] Deploy to production
- [ ] Monitor for errors
- [ ] Gather initial user feedback
- [ ] Create feedback mechanism

### 8.3 Post-Launch
- [ ] Address critical bugs
- [ ] Monitor performance and usage
- [ ] Plan next features based on feedback
- [ ] Prepare for mobile app development (Phase 2 of overall project)

---

## Future Enhancements (Post-MVP)

- Advanced quiz modes (timed challenges, regional focus, etc.)
- Leaderboards and competitive features
- Social features (share scores, challenge friends)
- Spaced repetition algorithm for optimal learning
- Offline mode support
- iOS and Android mobile apps
- Multi-language support
- Airport images and additional information
- Study streak tracking and gamification
