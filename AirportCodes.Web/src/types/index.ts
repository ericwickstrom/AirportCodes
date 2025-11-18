// API Models

export interface Airport {
	id: number;
	iataCode: string;
	airportName: string;
	city: string;
	country: string;
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
	token: string;
	user: User;
}

// Learning Mode DTOs
export interface LearningQuestion {
	questionId: string;
	airportName: string;
	city: string;
	country: string;
	options: string[];
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
}

export interface TestQuestion {
	questionId: string;
	airportName: string;
	city: string;
	country: string;
	options: string[];
	questionNumber: number;
	totalQuestions: number;
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

// API Response wrapper
export interface ApiError {
	message: string;
}
