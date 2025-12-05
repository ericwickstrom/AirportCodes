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
- [ ] Add timer (detailed implementation plan in Phase 8.8)

### 4.5 User Dashboard
- [x] Create Dashboard page
- [x] Add Learning Mode and Test Mode navigation cards
- [x] Display My Tests section with user's custom tests
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
- [x] Create 404 page

### 4.7 Authentication Forms
- [x] Create login form component
- [x] Add email and password input fields
- [x] Implement form validation (email format, password requirements)
- [x] Add error handling for failed login attempts
- [x] Show loading state during authentication
- [x] Create registration form component
- [x] Add email, password, and confirm password fields
- [x] Implement password strength validation
- [x] Add error handling for registration failures (duplicate email, etc.)
- [x] Redirect to dashboard after successful login/registration
- [x] Add "Forgot Password" link (placeholder for future)

### 4.8 Email Confirmation
- [ ] Install SendGrid NuGet package
- [ ] Add SendGrid API key to appsettings.json and user secrets
- [ ] Update User model with email confirmation fields
	- [ ] Add EmailConfirmed (bool, default false)
	- [ ] Add EmailConfirmationToken (string, nullable)
	- [ ] Add EmailConfirmationTokenExpiry (DateTime, nullable)
- [ ] Create database migration for new email confirmation fields
- [ ] Create IEmailService interface and EmailService implementation
	- [ ] Configure SendGrid client
	- [ ] Create method to send confirmation emails
	- [ ] Create email template for confirmation
- [ ] Update registration endpoint
	- [ ] Generate email confirmation token
	- [ ] Store token and expiry in database
	- [ ] Send confirmation email
	- [ ] Don't auto-login user after registration
	- [ ] Return success message instructing to check email
- [ ] Create email confirmation endpoint
	- [ ] POST /api/auth/confirm-email
	- [ ] Validate token and expiry
	- [ ] Mark email as confirmed
	- [ ] Return success/error response
- [ ] Create resend confirmation email endpoint
	- [ ] POST /api/auth/resend-confirmation
	- [ ] Generate new token
	- [ ] Send new confirmation email
- [ ] Update login endpoint
	- [ ] Check EmailConfirmed status
	- [ ] Return error if email not confirmed
	- [ ] Provide option to resend confirmation
- [ ] Create frontend confirmation pending page
	- [ ] Show after registration
	- [ ] Display "Check your email" message
	- [ ] Add "Resend email" button
- [ ] Create frontend email confirmation page
	- [ ] Parse token from URL query params
	- [ ] Call confirm-email endpoint
	- [ ] Show success/error message
	- [ ] Redirect to login on success
- [ ] Update registration flow
	- [ ] Remove auto-redirect to dashboard
	- [ ] Show confirmation pending page instead
- [ ] Add email confirmation status to login error handling
- [ ] Test email confirmation flow end-to-end
	- [ ] Test successful confirmation
	- [ ] Test expired token
	- [ ] Test invalid token
	- [ ] Test resend functionality
	- [ ] Test login blocking when unconfirmed

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

## Phase 7: Airport Data

### 7.1 Database Schema Updates ✅
- [x] Create Country model
	- [x] Id (Guid, Primary Key)
	- [x] Name (string, required, indexed)
	- [x] CountryCode (string, 2-3 letters, optional, ISO 3166)
- [x] Create City model
	- [x] Id (Guid, Primary Key)
	- [x] Name (string, required)
	- [x] CountryId (Guid, Foreign Key to Country)
	- [x] Navigation property to Country
- [x] Update Airport model
	- [x] Remove City and Country string fields
	- [x] Add CityId (Guid, Foreign Key to City)
	- [x] Add navigation property to City
	- [x] Keep IataCode and AirportName as-is
- [x] Update DbContext
	- [x] Add DbSet<Country>
	- [x] Add DbSet<City>
	- [x] Configure relationships (Country → Cities → Airports)
	- [x] Add indexes (City.CountryId, Airport.CityId)
- [x] Create and apply EF Core migration
	- [x] Generate migration for new schema
	- [x] Test migration rollback
	- [x] Apply to development database

### 7.2 Initial Data Strategy ✅
- [x] Analyze delta_airport_codes.csv structure and content (212 airports)
- [x] Define complete Airport data model requirements
	- [x] Determine if additional fields needed beyond IATA code
	- [x] Research data sources for missing metadata (city, country info)
- [x] Create data import/migration script
	- [x] Parse delta_airport_codes.csv
	- [x] Extract unique countries from enriched data (57 countries)
	- [x] Extract unique cities with country associations (206 cities)
	- [x] Map airports to cities via UUIDs
	- [x] Enrich with additional airport details (full name, etc.)
	- [x] Validate IATA codes against official sources
	- [x] Handle duplicates and data quality issues
- [x] Create SQL seed scripts
	- [x] Generate Countries INSERT statements with hardcoded UUIDs
	- [x] Generate Cities INSERT statements with hardcoded UUIDs
	- [x] Generate Airports INSERT statements with hardcoded UUIDs
	- [x] Create upsert (ON CONFLICT) logic for safe re-running
	- [x] Add to database migration or separate seed script

### 7.3 Data Sources & Enrichment
- [x] Research comprehensive airport data sources
	- [x] Evaluate OurAirports.com (open source, comprehensive)
	- [x] Consider IATA official data (licensing/cost)
	- [x] Check OpenFlights.org airport database
	- [x] Evaluate FAA data for US airports
- [x] Define data completeness requirements for MVP
	- [x] Required fields: IATA code, airport name, city, country
	- [x] Optional fields: ICAO code, timezone, coordinates, etc.
- [x] Create data validation rules
	- [x] IATA code format (3 uppercase letters)
	- [x] Required field validation
	- [x] Duplicate detection
- [x] Build data enrichment pipeline
	- [x] Map delta codes to full airport data
	- [x] Fill in missing information
	- [x] Standardize formats (country names, city names)
- [x] Store enriched data in airport_data.json (211 airports with complete metadata)

### 7.4 Future Data Management
- [ ] Design admin interface for data management (post-MVP)
	- [ ] Add new airports
	- [ ] Edit existing airports
	- [ ] Deactivate/archive airports
	- [ ] Bulk import capability
- [ ] Create data update strategy
	- [ ] Periodic refresh from authoritative sources
	- [ ] Version control for airport data
	- [ ] Change log/audit trail
- [ ] Handle data changes over time
	- [ ] Airport code reassignments
	- [ ] Airport closures
	- [ ] New airport additions
	- [ ] Name changes
- [ ] Define data expansion plan
	- [ ] Regional expansion (more airports per region)
	- [ ] Metadata expansion (images, additional details)
	- [ ] User-requested airports
	- [ ] Priority airports based on traffic/popularity

### 7.5 Data Quality & Maintenance
- [ ] Create data validation tests
	- [ ] Ensure all IATA codes are unique
	- [ ] Verify required fields are populated
	- [ ] Check for common data entry errors
- [ ] Implement data monitoring
	- [ ] Track data completeness metrics
	- [ ] Identify gaps or missing information
	- [ ] Monitor for stale/outdated data
- [ ] Document data lineage
	- [ ] Source attribution for each airport
	- [ ] Last updated timestamps
	- [ ] Data quality scores/confidence levels
- [ ] Create data backup strategy
	- [ ] Regular backups of airport database
	- [ ] Version snapshots before major updates
	- [ ] Recovery procedures

---

## Phase 8: Custom Test Creation

### 8.1 Backend - Custom Test Data Model ✅
- [x] Create CustomTest entity
	- [x] Id (Guid, Primary Key)
	- [x] Name (string, required)
	- [x] CreatedByUserId (Guid, Foreign Key to User)
	- [x] IsPublic (bool, default false)
	- [x] IsAnonymous (bool, default false - only applies if IsPublic is true)
	- [x] TimerEnabled (bool, default false)
	- [x] TimerDurationSeconds (int, nullable)
	- [x] IsDeleted (bool, default false - soft delete)
	- [x] CreatedDate (DateTime)
	- [x] UpdatedDate (DateTime)
- [x] Create CustomTestAirport junction table
	- [x] CustomTestId (Guid, Foreign Key)
	- [x] AirportId (Guid, Foreign Key)
	- [x] Composite Primary Key (CustomTestId, AirportId)
- [x] Create database migration for custom test tables
- [x] Apply migration to development database

### 8.2 Backend - Custom Test API
- [x] Create CustomTest controller
- [x] POST /api/custom-tests - Create new custom test
- [x] GET /api/custom-tests - Get user's custom tests (including soft-deleted with flag)
- [x] GET /api/custom-tests/{id} - Get single custom test details (allow anonymous access)
- [x] PUT /api/custom-tests/{id} - Update custom test
- [x] DELETE /api/custom-tests/{id} - Soft delete custom test
- [x] GET /api/custom-tests/public - Get all public custom tests (exclude soft-deleted)
- [x] GET /api/airports/search?q={query} - Search airports by code, city, or name (return limited results for autocomplete)
- [x] POST /api/airports/bulk-lookup - Bulk validate airport codes for CSV import
- [x] Update POST /api/custom-tests to accept airport_ids array and bulk insert into custom_test_airports junction table (use transaction)
- [x] Update PUT /api/custom-tests/{id} to accept airport_ids array and replace existing airports (delete all + insert new, use transaction)
- [x] Refine authorization attributes (move from controller-level to action-level)
- [x] ~~Separate custom test quiz endpoints~~ (Implemented via unified endpoints in sections 8.6.1 and 8.7.1)

### 8.3 Frontend - Custom Test Management UI
- [x] Create Custom Tests section on Dashboard (list view)
- [x] Display user's created custom tests
- [x] Show test name, # of airports, public/private status, timer badge
- [x] Add "Create Test" button
- [x] Add action buttons for each test (Practice, Take Test, View, Edit, Delete)
- [x] Implement delete functionality with confirmation dialog
- [ ] Implement view details modal/page
- [x] Implement edit functionality
- [ ] Add filter/search for user's tests

### 8.4 Frontend - Custom Test Creation/Edit Form
- [x] Create Custom Test Form modal (CreateTestModal)
- [x] Add test name input field
- [x] Add airport selection interface (searchable list)
	- [x] Create search input with dropdown results
	- [x] Search by IATA code, airport name, city, country
	- [x] Show dropdown with matching results (limit to ~10)
	- [x] Click to add airport to test
	- [x] Prevent duplicate selections
	- [x] Display selected airports in list format: "CODE - City, Country"
	- [x] Add remove button (X) for each selected airport
	- [x] Show selected count ("5 airports selected")
	- [x] Add minimum selection validation (need at least 5 airports)
	- [x] Add CSV bulk import functionality (paste or file upload)
	- [ ] Optional: Add quick filters (US Only, Europe Only, by region/continent)
- [x] Add timer toggle (enable/disable)
- [x] Add timer duration input (when enabled)
- [x] Add public/private toggle
- [x] Add anonymous/named toggle (when public is enabled)
- [x] Add save button with validation
- [x] Add cancel button
- [x] Reuse form for edit mode (pre-populate fields)

### 8.5 Frontend - Public Custom Tests Discovery
- [ ] Create Public Tests page (browse interface)
- [x] List all public custom tests (currently in ViewCustomTestsModal, fetches from API)
- [x] Show test name, creator (or "Anonymous"), # of airports
- [ ] Add search/filter functionality
- [x] Add "Practice" button (learning mode)
- [x] Add "Take Test" button (test mode)

### 8.6 Frontend - Custom Test Learning Mode Integration

#### 8.6.1 Backend - Custom Test Learning Endpoints ✅
- [x] Refactor existing GET /api/quiz/learning endpoint to support optional customTestId parameter
	- [x] Validate custom test exists and user has access (public or owned)
	- [x] Select random airport from test's airport list
	- [x] Generate 3 distractors from same test's airports
	- [x] Return same LearningQuestion DTO format
	- [x] Add proper authorization (public tests accessible to all, private only to creator)
	- [x] Handle edge case: custom test with < 4 airports
- [x] Reuse existing POST /api/quiz/learning/answer endpoint (no changes needed)
	- [x] Accept same LearningAnswerRequest format
	- [x] Validate answer against correct IATA code
	- [x] Return same LearningAnswerResponse format
	- [x] Works seamlessly with both regular and custom test questions

#### 8.6.2 Frontend - API Service Layer ✅
- [x] Update learningApi.getQuestion() in api.ts to accept optional customTestId parameter
	- [x] Change signature: getQuestion: (customTestId?: string) => ...
	- [x] Append query param if provided: /quiz/learning?customTestId=${customTestId}
	- [x] Reuse existing TypeScript types (no changes needed)
	- [x] Answer submission endpoint works unchanged (no modifications needed)

#### 8.6.3 Frontend - Quiz Store Refactoring ✅
- [x] Add customTestId state to quizStore (string | null)
- [x] Update startLearningMode() to accept optional customTestId parameter
	- [x] Store customTestId in state
	- [x] Pass customTestId to learningApi.getQuestion(customTestId)
- [x] Update nextLearningQuestion() to use stored customTestId
	- [x] Pass customTestId to learningApi.getQuestion(customTestId)
- [x] Update resetQuiz() to clear customTestId
- [x] No changes needed to submitLearningAnswer (works with both modes)

#### 8.6.4 Frontend - Routing & URL Structure ✅
- [x] Update App.tsx route definition from /learning to /learning/:customTestId?
	- [x] Support both /learning (regular mode) and /learning/{guid} (custom test mode)

#### 8.6.5 Frontend - LearningMode Component Refactoring ✅
- [x] Import useParams from react-router-dom to extract customTestId from URL
- [x] Update useEffect to pass customTestId from route params to startLearningMode(customTestId)
- [ ] Optionally fetch and display custom test name in header when customTestId is present
- [ ] Optionally add "Back to Dashboard" button for custom test mode
- [x] Error handling works automatically via existing error state

#### 8.6.6 Frontend - Dashboard Integration ✅
- [x] Update "Practice" button in My Tests section to navigate to /learning/{testId}
	- [x] Change from TODO comment to actual Link component
- [ ] Optionally update "Practice" button in ViewCustomTestsModal (if exists)
- [ ] Test navigation flow from dashboard to custom learning mode

#### 8.6.7 Testing & Validation
- [ ] Test regular learning mode still works (/learning without customTestId)
- [ ] Test custom test learning mode with valid test ID (/learning/{guid})
- [ ] Test navigation from Dashboard Practice button to custom learning mode
- [ ] Test score tracking across custom test questions
- [ ] Test error handling (invalid test ID, deleted test, insufficient airports)
- [ ] Test that distractors come from custom test's airports
- [ ] Optionally test showing custom test name in header
- [ ] Test backward compatibility with existing learning mode users

### 8.7 Frontend - Custom Test Test Mode Integration ✅

#### 8.7.1 Backend - Custom Test Test Mode Endpoints ✅
- [x] Refactor existing POST /api/quiz/test/start endpoint to support optional customTestId parameter
	- [x] Validate custom test exists and user has access (public or owned)
	- [x] Cap totalQuestions to custom test's airport count
	- [x] Store customTestId in TestSession for question generation
	- [x] Add proper authorization (public tests accessible to all, private only to creator)
- [x] Update GET /api/quiz/test/{sessionId}/question to query from custom test airports
	- [x] Use customTestId from session to filter airports
	- [x] Select unused airport from custom test's airport list
	- [x] Generate 3 distractors from same test's airports
- [x] Reuse existing test mode answer and results endpoints (no changes needed)

#### 8.7.2 Frontend - API Service Layer ✅
- [x] Update testApi.startTest() in api.ts to accept optional customTestId parameter
	- [x] Change signature: startTest: (totalQuestions?: number, customTestId?: string) => ...
	- [x] Append query param if provided: /quiz/test/start?totalQuestions={n}&customTestId={id}
	- [x] Reuse existing TypeScript types

#### 8.7.3 Frontend - Quiz Store Refactoring ✅
- [x] Update startTestMode() to accept optional customTestId parameter
	- [x] Store customTestId in state
	- [x] Pass customTestId to testApi.startTest(totalQuestions, customTestId)

#### 8.7.4 Frontend - Routing & URL Structure ✅
- [x] Update App.tsx route definition from /test to /test/:customTestId?
	- [x] Support both /test (regular mode) and /test/{guid} (custom test mode)

#### 8.7.5 Frontend - TestMode Component Refactoring ✅
- [x] Import useParams from react-router-dom to extract customTestId from URL
- [x] Add useEffect to fetch custom test and get airportCount
- [x] Set default question count to test's airportCount
- [x] Pass customTestId from route params to startTestMode(selectedQuestionCount, customTestId)
- [x] Error handling works automatically via existing error state

#### 8.7.6 Frontend - Dashboard Integration ✅
- [x] Update "Take Test" button in My Tests section to navigate to /test/{testId}
	- [x] Change from TODO comment to actual Link component

### 8.8 UX Improvements ✅

#### 8.8.1 Shared Quiz Components ✅
- [x] Create shared quiz component library to eliminate code duplication
	- [x] QuizLayout - Page wrapper with header and gradient background
	- [x] QuestionDisplay - Airport information display component
	- [x] FeedbackPanel - Answer feedback with configurable explanation
	- [x] QuizButton - Standardized button with primary/secondary variants
	- [x] LoadingState - Loading spinner component
	- [x] ErrorState - Error display with optional retry
	- [x] ScoreDisplay - Score/progress indicator component
- [x] Refactor LearningMode to use shared components
	- [x] Replace duplicated layout code with QuizLayout
	- [x] Use shared QuestionDisplay for airport info
	- [x] Use shared FeedbackPanel for answer feedback
	- [x] Use shared QuizButton for actions
- [x] Refactor TestMode to use shared components
	- [x] Replace duplicated layout code with QuizLayout
	- [x] Use shared QuestionDisplay for airport info
	- [x] Use shared FeedbackPanel for answer feedback
	- [x] Use shared QuizButton for actions

#### 8.8.2 Custom Test Question Count Display ✅
- [x] Backend - Add totalQuestions to LearningQuestionDto
	- [x] Add TotalQuestions property (nullable int)
	- [x] Populate with airport count for custom tests
	- [x] Leave null for standard learning mode
- [x] Frontend - Update LearningQuestion interface
	- [x] Add totalQuestions?: number property
- [x] Frontend - Update score display logic
	- [x] Show fixed total for custom tests (X/N)
	- [x] Show incrementing total for standard mode (X/Y)

#### 8.8.3 Skip Config Screen for Custom Tests ✅
- [x] Update TestMode to auto-start custom tests
	- [x] Add hasAutoStarted state to prevent duplicate starts
	- [x] Modify useEffect to fetch and auto-start custom tests
	- [x] Use full airport count from custom test automatically
	- [x] Show loading state during auto-start
	- [x] Keep config screen for standard test mode only
- [x] Improve user flow for custom tests
	- [x] Dashboard → "Take Test" → Questions (skip config)
	- [x] Standard test: Home → Config → Questions (unchanged)

### 8.9 Timer Implementation for Custom Tests ✅

#### 8.9.1 Backend Timer Infrastructure ✅
- [x] Update TestSession model to include timer fields
	- [x] Add TimerStartedAt (DateTime?, nullable)
	- [x] Add TimerDurationSeconds (int?, nullable)
	- [x] Add TimerExpiresAt (DateTime?, nullable)
- [x] Update TestSessionDto to include timer fields matching model
- [x] Update QuizService.StartTestAsync to initialize timer when custom test has TimerEnabled
	- [x] Retrieve TimerDurationSeconds from CustomTest
	- [x] Set TimerStartedAt to DateTime.UtcNow
	- [x] Calculate TimerExpiresAt = TimerStartedAt + TimerDurationSeconds
	- [x] Store timer values in TestSession cache
- [x] Implement dynamic cache expiration for sessions
	- [x] Timed tests: timer duration + 10 minute buffer
	- [x] Non-timed tests: estimated time based on question count + 15 minute buffer

#### 8.9.2 Backend Timer Validation ✅
- [x] Add timer expiration check in QuizService.GetTestQuestionAsync
	- [x] If TimerExpiresAt exists and current time > TimerExpiresAt, throw exception
	- [x] Return meaningful error message: "Test time has expired"
- [x] Add timer expiration check in QuizService.SubmitTestAnswerAsync
	- [x] Block answer submission if timer expired
	- [x] Return error response for late submissions
- [x] Update QuizService.GetTestResultsAsync to allow retrieval after expiration
	- [x] Include timer status in results (completed within time vs expired)

#### 8.9.3 Frontend Timer UI Component ✅
- [x] Create TimerDisplay component (src/components/quiz/TimerDisplay.tsx)
	- [x] Accept timerExpiresAt (ISO datetime string) as prop
	- [x] Accept onExpire callback prop
	- [x] Calculate remaining time from server's TimerExpiresAt vs current client time
	- [x] Display in MM:SS format
	- [x] Update every second using setInterval
	- [x] Implement visual states:
		- [x] Normal state (> 60s): gray/white text
		- [x] Warning state (30-60s): yellow text
		- [x] Critical state (< 30s): red text with pulsing animation
		- [x] Expired state: "Time's Up!" in red
	- [x] Call onExpire callback when timer reaches 0
	- [x] Clean up interval on component unmount
	- [x] Handle tab backgrounding (use Date calculations, not counters)

#### 8.9.4 Frontend Timer Integration ✅
- [x] Update TestSession interface in types/index.ts
	- [x] Add timerStartedAt?: string
	- [x] Add timerDurationSeconds?: number
	- [x] Add timerExpiresAt?: string
- [x] Update TestMode component to integrate timer
	- [x] Import TimerDisplay component
	- [x] Check if testSession.timerExpiresAt exists
	- [x] Render TimerDisplay in header (next to ScoreDisplay) when timer enabled
	- [x] Implement onExpire handler:
		- [x] Set state to block further answer submissions
		- [x] Auto-call completeTest() to retrieve results
		- [x] Show "Time expired" message/toast
- [x] Update quiz store to handle timer expiration state
	- [x] Add timerExpired flag to state
	- [x] Block answer submissions when expired
	- [x] Handle graceful transition to results

#### 8.9.5 Timer Session Persistence ✅
- [x] Ensure server uses UTC exclusively (DateTime.UtcNow)
- [x] Handle network latency for near-expiration submissions
	- [x] Backend is source of truth for expiration
	- [x] Frontend handles "Answer submitted too late" error
- [x] Handle page refresh during timed test
	- [x] Add timer fields to TestQuestionDto response
	- [x] Create localStorage helpers for session persistence
	- [x] Implement resumeTestSession function
	- [x] Auto-resume session on page load if exists
	- [x] Dynamic question cache expiration aligned with session
- [ ] Add timer info to results screen
	- [ ] Display time taken vs total time allowed
	- [ ] Show whether test was completed or expired
- [ ] Optional: Add countdown before timer starts ("Starting in 3... 2... 1...")
- [ ] Optional: Add audio/visual alerts at 60s and 30s remaining

#### 8.9.6 Testing & Validation
- [ ] Backend Testing
	- [ ] Test timer values correctly set on test start
	- [ ] Test expired timer blocks question fetching
	- [ ] Test expired timer blocks answer submission
	- [ ] Test results retrievable after timer expiration
	- [ ] Test non-timed tests remain unaffected
	- [ ] Test dynamic cache expiration works correctly
	- [ ] Test session persistence across page refresh
- [ ] Frontend Testing
	- [ ] Test timer displays correctly in MM:SS format
	- [ ] Test timer counts down accurately every second
	- [ ] Test warning states trigger at correct thresholds (60s, 30s)
	- [ ] Test auto-submit triggers on expiration
	- [ ] Test timer handles tab backgrounding
	- [ ] Test timer works across timezones (UTC handling)
	- [ ] Test visual states and animations
	- [ ] Test session restoration from localStorage
	- [ ] Test timer continues correctly after page refresh
- [ ] Integration Testing
	- [ ] Test end-to-end timed test flow
	- [ ] Test answer submission near expiration time
	- [ ] Test timer expiration mid-question
	- [ ] Test results screen shows correct timer info
	- [ ] Test page refresh during active test
	- [ ] Test localStorage cleanup after test completion
	- [ ] Test CRUD operations for custom tests
	- [ ] Test airport selection with large datasets
	- [ ] Test public/private visibility
	- [ ] Test anonymous/named creator toggle
	- [ ] Test question shuffling
	- [ ] Test soft delete and restore
	- [ ] Test permissions (only creator can edit/delete)

---

## Phase 9: User Settings & Profile

### 9.1 Backend - User Settings
- [ ] Create Theme entity
	- [ ] Id (Guid, Primary Key)
	- [ ] Name (string, required - "Light", "Dark", "System")
	- [ ] Code (string, required - "light", "dark", "system")
	- [ ] IsActive (bool, default true)
- [ ] Create UserSettings entity
	- [ ] Id (Guid, Primary Key)
	- [ ] UserId (Guid, Foreign Key to User)
	- [ ] DefaultQuizLength (int, nullable)
	- [ ] PreferredRegions (string, nullable - JSON array or comma-separated)
	- [ ] ThemeId (Guid, nullable, Foreign Key to Theme)
	- [ ] EmailNotifications (bool, default true)
	- [ ] CreatedDate (DateTime)
	- [ ] UpdatedDate (DateTime)
- [ ] Create database migration for Theme and UserSettings tables
- [ ] Create seed data migration to populate Theme table with default themes:
	- [ ] Light theme (deterministic GUID)
	- [ ] Dark theme (deterministic GUID)
	- [ ] System theme (deterministic GUID)
- [ ] Apply migration to development database
- [ ] Create UserSettings controller
- [ ] GET /api/user/settings - Get current user's settings
- [ ] PUT /api/user/settings - Update user settings
- [ ] GET /api/themes - Get available themes
- [ ] Create UserSettings service layer

### 9.2 Frontend - Settings Page
- [ ] Create Settings page component
- [ ] Add route for /settings
- [ ] Update header to link username to settings page
- [ ] Create settings form with sections:
	- [ ] Account Information section
		- [ ] Display email (read-only)
		- [ ] Display account creation date
		- [ ] Add "Change Password" button (future)
	- [ ] Quiz Preferences section
		- [ ] Default quiz length selector (5, 10, 15, 20, 25, 50)
		- [ ] Preferred regions/countries multi-select
	- [ ] Appearance section
		- [ ] Theme selector (Light, Dark, System)
	- [ ] Notifications section
		- [ ] Email notifications toggle
	- [ ] Danger Zone section
		- [ ] Delete account button (with confirmation, future)
- [ ] Add save button with validation
- [ ] Add cancel/reset button
- [ ] Show success/error messages
- [ ] Handle loading states

### 9.3 Integration
- [ ] Apply user settings to quiz modes
	- [ ] Use default quiz length when starting tests
	- [ ] Filter airports by preferred regions (optional)
- [ ] Apply theme settings to entire application
- [ ] Persist settings in backend database
- [ ] Cache settings in frontend store (Zustand)

### 9.4 Testing
- [ ] Test settings CRUD operations
- [ ] Test settings application to quiz modes
- [ ] Test theme switching
- [ ] Test form validation
- [ ] Test persistence across sessions

---

## Phase 10: Toast Notifications System

### 10.1 Toast Infrastructure
- [ ] Research toast/notification libraries (react-hot-toast, react-toastify, sonner)
- [ ] Choose library based on bundle size, features, and simplicity
- [ ] Install chosen toast library
- [ ] Configure toast provider in App.tsx
- [ ] Set up default toast styling to match application theme
- [ ] Create toast utility functions/hooks for common use cases

### 10.2 Toast Implementation
- [ ] Replace inline success/error messages with toast notifications:
	- [ ] Settings page save success/error
	- [ ] Custom test creation success/error
	- [ ] Login/registration success/error
	- [ ] Email confirmation success/error
	- [ ] Quiz submission feedback (optional)
- [ ] Add toast notifications for:
	- [ ] Network errors (API failures)
	- [ ] Session expiration warnings
	- [ ] Copy-to-clipboard confirmations
	- [ ] Form validation errors (optional)
- [ ] Implement toast types:
	- [ ] Success toasts (green)
	- [ ] Error toasts (red)
	- [ ] Warning toasts (yellow)
	- [ ] Info toasts (blue)
	- [ ] Loading toasts (for async operations)

### 10.3 User Experience Enhancements
- [ ] Configure toast positioning (top-right, bottom-right, etc.)
- [ ] Set appropriate toast duration by type:
	- [ ] Success: 3 seconds
	- [ ] Error: 5 seconds
	- [ ] Warning: 4 seconds
	- [ ] Info: 3 seconds
- [ ] Add toast dismiss button
- [ ] Enable toast stacking/queuing
- [ ] Add toast animations (slide-in, fade-out)
- [ ] Ensure toasts are accessible (ARIA labels, keyboard navigation)

### 10.4 Testing
- [ ] Test toast notifications across all pages
- [ ] Verify toast positioning on mobile devices
- [ ] Test toast behavior with multiple simultaneous notifications
- [ ] Ensure toasts don't block critical UI elements
- [ ] Test keyboard accessibility (ESC to dismiss)

---

## Phase 100: Deployment Preparation

### 100.1 Backend Deployment
- [ ] Create production appsettings.json
- [ ] Configure production database
- [ ] Set up database migrations for production
- [ ] Configure production logging
- [ ] Set up health check endpoints
- [ ] Choose hosting platform (Azure, AWS, etc.)
- [ ] Create deployment scripts/CI-CD pipeline

### 100.2 Frontend Deployment
- [ ] Configure production build settings
- [ ] Optimize bundle size
- [ ] Configure environment variables for production
- [ ] Choose hosting platform (Vercel, Netlify, Azure Static Web Apps, etc.)
- [ ] Set up CDN for static assets
- [ ] Configure production API URLs

### 100.3 DevOps
- [ ] Set up production database (PostgreSQL)
- [ ] Configure SSL certificates
- [ ] Set up monitoring/logging (Application Insights, etc.)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Create deployment documentation

---

## Phase 101: MVP Launch

### 101.1 Pre-Launch
- [ ] Final end-to-end testing in production environment
- [ ] Security audit
- [ ] Performance testing
- [ ] Create user documentation/help section
- [ ] Prepare privacy policy and terms of service

### 101.2 Launch
- [ ] Deploy to production
- [ ] Monitor for errors
- [ ] Gather initial user feedback
- [ ] Create feedback mechanism

### 101.3 Post-Launch
- [ ] Address critical bugs
- [ ] Monitor performance and usage
- [ ] Plan next features based on feedback
- [ ] Prepare for mobile app development (Phase 2 of overall project)

---

## Phase 11: Custom Test Favorites

### 11.1 Backend - Favorites Data Model
- [ ] Create CustomTestFavorite entity
	- [ ] Id (Guid, Primary Key)
	- [ ] UserId (Guid, Foreign Key to User)
	- [ ] CustomTestId (Guid, Foreign Key to CustomTest)
	- [ ] CreatedDate (DateTime)
	- [ ] Unique constraint on (UserId, CustomTestId)
- [ ] Create database migration for favorites table
- [ ] Apply migration to development database

### 11.2 Backend - Favorites API
- [ ] Create Favorites controller or extend CustomTest controller
- [ ] POST /api/custom-tests/{id}/favorite - Add test to favorites
- [ ] DELETE /api/custom-tests/{id}/favorite - Remove test from favorites
- [ ] GET /api/custom-tests/favorites - Get user's favorited tests
- [ ] Update GET /api/custom-tests and GET /api/custom-tests/public to include isFavorited boolean for authenticated users
- [ ] Add authorization (users can only manage their own favorites)

### 11.3 Frontend - Favorites UI
- [ ] Add favorite button/icon to custom test cards (both My Tests and Public Tests sections)
- [ ] Implement favorite toggle functionality (add/remove)
- [ ] Show visual indicator for favorited tests (filled heart/star vs outline)
- [ ] Add "Favorites" filter/section on Dashboard
- [ ] Display favorited tests in a dedicated section or filtered view
- [ ] Add unfavorite option in favorites view
- [ ] Show loading state during favorite operations
- [ ] Show success/error toast notifications

### 11.4 Integration & Polish
- [ ] Update customTestApi service with favorite endpoints
- [ ] Update custom test types to include isFavorited property
- [ ] Persist favorite state in frontend after operations
- [ ] Handle edge cases (favoriting deleted tests, permission errors)
- [ ] Add keyboard shortcut for favoriting (optional)

### 11.5 Testing
- [ ] Test favorite/unfavorite operations
- [ ] Test favorites list retrieval
- [ ] Test favorite persistence across sessions
- [ ] Test permissions (users can't favorite their own tests, or allow it)
- [ ] Test UI updates after favorite state changes
- [ ] Test favoriting public vs private tests

---

## Future Enhancements (Post-MVP)

### Custom Test Enhancements
- Custom test results tracking (save all attempts, show personal best)
- Custom test metadata (description field, tags/categories)
- Custom test leaderboards for public tests
- Custom test analytics (show "X people have taken this test", average score)
- Timer option for learning mode
- Custom test sharing via links
- Custom test templates/presets

### General Enhancements
- Advanced quiz modes (timed challenges, regional focus, etc.)
- Leaderboards and competitive features
- Social features (share scores, challenge friends)
- Spaced repetition algorithm for optimal learning
- Offline mode support
- iOS and Android mobile apps
- Multi-language support
- Airport images and additional information
- Study streak tracking and gamification
- Dark Mode
