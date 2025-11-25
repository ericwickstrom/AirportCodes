import type {
	LoginRequest,
	RegisterRequest,
	AuthResponse,
	ConfirmEmailRequest,
	ResendConfirmationRequest,
	LearningQuestion,
	LearningAnswerRequest,
	LearningAnswerResponse,
	TestSession,
	TestQuestion,
	TestAnswerRequest,
	TestAnswerResponse,
	TestResult,
	Airport,
	BulkLookupResponse,
	CustomTest,
	CreateCustomTestRequest,
	CustomTestDetail,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5296/api';

export class ApiError extends Error {
	status: number;
	emailNotConfirmed?: boolean;

	constructor(status: number, message: string, emailNotConfirmed?: boolean) {
		super(message);
		this.status = status;
		this.emailNotConfirmed = emailNotConfirmed;
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
		const error: { message: string; emailNotConfirmed?: boolean } = await response.json().catch(() => ({
			message: `HTTP ${response.status}: ${response.statusText}`,
		}));
		throw new ApiError(response.status, error.message, error.emailNotConfirmed);
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

	confirmEmail: (data: ConfirmEmailRequest) =>
		fetchApi<{ message: string }>('/auth/confirm-email', {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	resendConfirmation: (data: ResendConfirmationRequest) =>
		fetchApi<{ message: string }>('/auth/resend-confirmation', {
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

// Airport API
export const airportApi = {
	search: (query: string, limit: number = 20) =>
		fetchApi<Airport[]>(`/airports/search?q=${encodeURIComponent(query)}&limit=${limit}`),

	bulkLookup: (iataCodes: string[]) =>
		fetchApi<BulkLookupResponse>('/airports/bulk-lookup', {
			method: 'POST',
			body: JSON.stringify({ iataCodes }),
		}),
};

// Custom Test API
export const customTestApi = {
	create: (data: CreateCustomTestRequest) =>
		fetchApi<CustomTestDetail>('/custom-tests', {
			method: 'POST',
			body: JSON.stringify(data),
		}),

	getUserTests: (includeDeleted: boolean = false) =>
		fetchApi<CustomTest[]>(`/custom-tests?includeDeleted=${includeDeleted}`),

	getPublicTests: () =>
		fetchApi<CustomTest[]>('/custom-tests/public'),
};
