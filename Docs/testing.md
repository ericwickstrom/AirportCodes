# Comprehensive Testing Plan

This document outlines the testing strategy for the AirportCodes application. The goal is to ensure application stability, correctness, and a high-quality user experience.

## Testing Pyramid

Our strategy follows the principles of the testing pyramid:

- **End-to-End (E2E) Tests (Few):** Simulate full user journeys.
- **Integration Tests (More):** Verify interactions between different components (e.g., frontend and backend).
- **Unit Tests (Many):** Test individual components and functions in isolation.

---

## 1. API Testing (Backend)

These tests should directly target the .NET API endpoints without involving the frontend. Tools like Postman, Insomnia, or automated test scripts using `dotnet test` with `WebApplicationFactory` can be used.

### AuthController

- `POST /api/Auth/register`
  - [ ] Test with valid user data. Expect 200 OK and an auth token.
  - [ ] Test with an already existing email. Expect 400 Bad Request.
  - [ ] Test with invalid email format. Expect 400 Bad Request.
  - [ ] Test with a weak password. Expect 400 Bad Request.
- `POST /api/Auth/login`
  - [ ] Test with valid credentials. Expect 200 OK and an auth token.
  - [ ] Test with invalid credentials. Expect 401 Unauthorized.
  - [ ] Test with an unconfirmed email. Expect 401 Unauthorized.
- `POST /api/Auth/confirm-email`
  - [ ] Test with a valid confirmation token. Expect 200 OK.
  - [ ] Test with an invalid/expired token. Expect 400 Bad Request.
- `POST /api/Auth/refresh-token`
  - [ ] Test with a valid refresh token. Expect 200 OK with a new JWT.
  - [ ] Test with an invalid/expired refresh token. Expect 401 Unauthorized.

### AirportsController

- `GET /api/Airports/search`
  - [ ] Test with a valid search term (e.g., "sea"). Expect 200 OK and a paginated list of airports.
  - [ ] Test with a search term that has no results. Expect 200 OK and an empty list.
  - [ ] Test with pagination parameters (`page`, `pageSize`). Expect correctly paginated results.

### QuizController

- `GET /api/Quiz/learning-question`
  - [ ] Test successful retrieval of a random learning question. Expect 200 OK.
- `POST /api/Quiz/learning-answer`
  - [ ] Test with a correct answer. Expect 200 OK and `isCorrect: true`.
  - [ ] Test with an incorrect answer. Expect 200 OK and `isCorrect: false`.
- `POST /api/Quiz/start-test`
  - [ ] Test starting a standard test. Expect 200 OK and a test session with questions.
  - [ ] Test starting a custom test with a valid ID. Expect 200 OK.
  - [ ] Test starting a custom test with an invalid ID. Expect 404 Not Found.
- `POST /api/Quiz/submit-answer`
  - [ ] Test submitting an answer for a test session. Expect 200 OK.
- `GET /api/Quiz/test-result/{sessionId}`
  - [ ] Test retrieving results for a completed session. Expect 200 OK.
  - [ ] Test retrieving results for a non-existent session. Expect 404 Not Found.

### CustomTestController

- `POST /api/CustomTest`
  - [ ] Test creating a custom test with valid data. Expect 201 Created.
- `GET /api/CustomTest`
  - [ ] Test retrieving all custom tests for a user. Expect 200 OK.
- `GET /api/CustomTest/{id}`
  - [ ] Test retrieving a specific custom test. Expect 200 OK.
  - [ ] Test retrieving a test owned by another user. Expect 403 Forbidden.
- `PUT /api/CustomTest/{id}`
  - [ ] Test updating a custom test. Expect 204 No Content.
- `DELETE /api/CustomTest/{id}`
  - [ ] Test deleting a custom test. Expect 204 No Content.

---

## 2. Unit Tests

### Backend (.NET)

- **Services:**
  - [ ] `AirportService`: Mock the DbContext and verify search logic.
  - [ ] `QuizService`: Mock the DbContext and verify question generation and answer checking logic.
  - [ ] `CustomTestService`: Mock the DbContext and verify CRUD operations and ownership checks.
  - [ ] `JwtTokenService`: Verify token generation with correct claims.
  - [ ] `EmailService`: Verify that the email sending client is called with the correct parameters (using a mock).
- **Models:**
  - [ ] Test any validation logic or methods on model classes.

### Frontend (React)

- **Components:**
  - [ ] `FormInput`: Test rendering, value changes, and error display.
  - [ ] `Modal`: Test open/close state and content rendering.
  - [ ] `ConfirmModal`: Test that onConfirm and onCancel handlers are called correctly.
  - [ ] `ProtectedRoute`: Test that it redirects unauthenticated users.
- **Stores (Zustand):**
  - [ ] `authStore`: Test login, logout, and user state changes.
  - [ ] `quizStore`: Test quiz state logic (starting, answering, finishing).
  - [ ] `settingsStore`: Test state changes for theme and other settings.
- **Utils:**
  - [ ] Test any utility functions for data formatting, validation, etc.

---

## 3. Integration Tests

### Backend (.NET)

- [ ] Test service layer interaction with a real test database (in-memory or a dedicated test DB).
- [ ] Verify that `AirportService` correctly queries the database and returns filtered results.
- [ ] Verify that `QuizService` correctly interacts with `Airport` and `City` data to build questions.
- [ ] Verify Entity Framework Core configurations, relationships, and constraints.

### Frontend (React)

- [ ] Test page components that fetch data (e.g., `Dashboard`, `TestMode`) with a mocked API (`msw` - Mock Service Worker).
- [ ] Verify that `Login.tsx` correctly calls the `authStore` and redirects on success.
- [ ] Verify that `Settings.tsx` interacts correctly with `settingsStore`.
- [ ] Verify that `TestMode.tsx` correctly fetches questions and submits answers via `quizStore` and the mocked API.

---

## 4. End-to-End (E2E) Tests

These tests simulate a real user journey from start to finish using a browser automation framework like Cypress or Playwright.

- **Authentication Flow:**
  - [ ] A user can successfully register for a new account.
  - [ ] A user can log in.
  - [ ] A user is redirected from a protected page if not logged in.
  - [ ] A user can log out.
- **Quiz Flow:**
  - [ ] A user can start a standard quiz, answer questions, and see their results.
  - [ ] A user can use the "Learning Mode".
- **Custom Test Flow:**
  - [ ] A user can create a custom test by searching for and adding airports.
  - [ ] A user can start a quiz using their custom test.
  - [ ] A user can edit and delete a custom test.
- **Settings Flow:**
  - [ ] A user can navigate to the settings page.
  - [ ] A user can change a setting (e.g., theme) and see it persist after a page reload.

