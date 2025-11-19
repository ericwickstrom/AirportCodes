import type {
	LoginRequest,
	RegisterRequest,
	AuthResponse,
	LearningQuestion,
	LearningAnswerRequest,
	LearningAnswerResponse,
	TestSession,
	TestQuestion,
	TestAnswerRequest,
	TestAnswerResponse,
	TestResult,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5296/api';

export class ApiError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.name = 'ApiError';
	}
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
	return localStorage.getItem('auth_token');
};

// Generic fetch wrapper with auth and error handling
async function fetchApi<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const token = getAuthToken();

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		...options,
		headers,
	});

	if (!response.ok) {
		const error: { message: string } = await response.json().catch(() => ({
			message: `HTTP ${response.status}: ${response.statusText}`,
		}));
		throw new ApiError(response.status, error.message);
	}

	return response.json();
}

// Auth API
export const authApi = {
	login: (data: LoginRequest) =>
		fetchApi<AuthResponse>('/auth/login', {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	register: (data: RegisterRequest) =>
		fetchApi<AuthResponse>('/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
		}),
};

// Learning Mode API
export const learningApi = {
	getQuestion: () =>
		fetchApi<LearningQuestion>('/quiz/learning'),

	submitAnswer: (data: LearningAnswerRequest) =>
		fetchApi<LearningAnswerResponse>('/quiz/learning/answer', {
			method: 'POST',
			body: JSON.stringify(data),
		}),
};

// Test Mode API
export const testApi = {
	startTest: (totalQuestions: number = 10) =>
		fetchApi<TestSession>(`/quiz/test/start?totalQuestions=${totalQuestions}`, {
			method: 'POST',
		}),

	getQuestion: (sessionId: string) =>
		fetchApi<TestQuestion>(`/quiz/test/${sessionId}/question`),

	submitAnswer: (data: TestAnswerRequest) =>
		fetchApi<TestAnswerResponse>('/quiz/test/answer', {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	getResults: (sessionId: string) =>
		fetchApi<TestResult>(`/quiz/test/${sessionId}/results`),
};
