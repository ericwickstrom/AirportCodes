// API Models

export interface Airport {
	id: string;
	iataCode: string;
	airportName: string;
	city: string;
	country: string;
}

export interface BulkLookupRequest {
	iataCodes: string[];
}

export interface BulkLookupResponse {
	validAirports: Airport[];
	invalidCodes: string[];
}

export interface User {
	id: string;
	email: string;
	dateCreated: string;
	lastLogin?: string;
}

// Auth DTOs
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	accessToken: string;
	refreshToken: string;
	user: User;
}

export interface ConfirmEmailRequest {
	token: string;
}

export interface ResendConfirmationRequest {
	email: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

// Learning Mode DTOs
export interface LearningQuestion {
	questionId: string;
	airportName: string;
	city: string;
	country: string;
	options: string[];
	totalQuestions?: number;
	customTestName?: string;
}

export interface LearningAnswerRequest {
	questionId: string;
	selectedAnswer: string;
}

export interface LearningAnswerResponse {
	isCorrect: boolean;
	correctAnswer: string;
	explanation: string;
}

// Test Mode DTOs
export interface TestSession {
	sessionId: string;
	totalQuestions: number;
	timerStartedAt?: string;
	timerDurationSeconds?: number;
	timerExpiresAt?: string;
}

export interface TestQuestion {
	questionId: string;
	airportName: string;
	city: string;
	country: string;
	options: string[];
	questionNumber: number;
	totalQuestions: number;
	timerStartedAt?: string;
	timerDurationSeconds?: number;
	timerExpiresAt?: string;
	customTestName?: string;
}

export interface TestAnswerRequest {
	sessionId: string;
	questionId: string;
	selectedAnswer: string;
}

export interface TestAnswerResponse {
	isCorrect: boolean;
	correctAnswer: string;
}

export interface TestResult {
	totalQuestions: number;
	correctAnswers: number;
	incorrectAnswers: number;
	scorePercentage: number;
}

// Custom Test DTOs
export interface CustomTest {
	id: string;
	name: string;
	airportCount: number;
	isPublic: boolean;
	isAnonymous: boolean;
	creatorName?: string;
	timerEnabled: boolean;
	timerDurationSeconds?: number;
	isDeleted: boolean;
	createdDate: string;
	updatedDate: string;
}

export interface CreateCustomTestRequest {
	name: string;
	airportIds: string[];
	isPublic: boolean;
	isAnonymous: boolean;
	timerEnabled: boolean;
	timerDurationSeconds?: number;
}

export interface CustomTestDetail {
	id: string;
	name: string;
	airports: Airport[];
	isPublic: boolean;
	isAnonymous: boolean;
	creatorName?: string;
	timerEnabled: boolean;
	timerDurationSeconds?: number;
	isDeleted: boolean;
	createdDate: string;
	updatedDate: string;
}

// User Settings DTOs
export interface Theme {
	id: string;
	name: string;
	code: string;
	isActive: boolean;
}

export interface UserSettings {
	id: string;
	userId: string;
	defaultQuizLength?: number;
	preferredRegions?: string;
	themeId?: string;
	emailNotifications: boolean;
	createdDate: string;
	updatedDate: string;
}

export interface UpdateUserSettingsRequest {
	defaultQuizLength?: number;
	preferredRegions?: string;
	themeId?: string;
	emailNotifications: boolean;
}
