import type {
	LoginRequest,
	RegisterRequest,
	AuthResponse,
	ConfirmEmailRequest,
	ResendConfirmationRequest,
	RefreshTokenRequest,
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
	Theme,
	UserSettings,
	UpdateUserSettingsRequest,
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

// Track if we're already refreshing to avoid multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
	refreshSubscribers.forEach(callback => callback(token));
	refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
	refreshSubscribers.push(callback);
};

// Generic fetch wrapper with auth and error handling
async function fetchApi<T>(
	endpoint: string,
	options: RequestInit = {},
	isRetry: boolean = false
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

	// Handle 401 Unauthorized - try to refresh token
	if (response.status === 401 && !isRetry && endpoint !== '/auth/refresh' && endpoint !== '/auth/login') {
		if (!isRefreshing) {
			isRefreshing = true;
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				try {
					const authResponse = await authApi.refresh({ refreshToken });
					localStorage.setItem('auth_token', authResponse.accessToken);
					localStorage.setItem('refresh_token', authResponse.refreshToken);
					localStorage.setItem('user', JSON.stringify(authResponse.user));

					isRefreshing = false;
					onRefreshed(authResponse.accessToken);

					// Retry original request with new token
					return fetchApi<T>(endpoint, options, true);
				} catch (error) {
					isRefreshing = false;
					// Refresh failed, logout user
					localStorage.removeItem('auth_token');
					localStorage.removeItem('refresh_token');
					localStorage.removeItem('user');
					window.location.href = '/';
					throw error;
				}
			} else {
				// No refresh token available
				localStorage.removeItem('auth_token');
				localStorage.removeItem('user');
				window.location.href = '/';
			}
		} else {
			// Already refreshing, wait for it to complete
			return new Promise((resolve, reject) => {
				addRefreshSubscriber(() => {
					// Retry original request with new token
					fetchApi<T>(endpoint, options, true).then(resolve).catch(reject);
				});
			});
		}
	}

	if (!response.ok) {
		const error: { message: string; emailNotConfirmed?: boolean } = await response.json().catch(() => ({
			message: `HTTP ${response.status}: ${response.statusText}`,
		}));
		throw new ApiError(response.status, error.message, error.emailNotConfirmed);
	}

	// Handle 204 No Content responses
	if (response.status === 204) {
		return undefined as T;
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

	refresh: (data: RefreshTokenRequest) =>
		fetchApi<AuthResponse>('/auth/refresh', {
			method: 'POST',
			body: JSON.stringify(data),
		}),
};

// Learning Mode API
export const learningApi = {
	getQuestion: (customTestId?: string) =>
		fetchApi<LearningQuestion>(
			customTestId ? `/quiz/learning?customTestId=${customTestId}` : '/quiz/learning'
		),

	submitAnswer: (data: LearningAnswerRequest) =>
		fetchApi<LearningAnswerResponse>('/quiz/learning/answer', {
			method: 'POST',
			body: JSON.stringify(data),
		}),
};

// Test Mode API
export const testApi = {
	startTest: (totalQuestions: number = 10, customTestId?: string) =>
		fetchApi<TestSession>(
			customTestId
				? `/quiz/test/start?totalQuestions=${totalQuestions}&customTestId=${customTestId}`
				: `/quiz/test/start?totalQuestions=${totalQuestions}`,
			{
				method: 'POST',
			}
		),

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

	searchPublicTests: (query: string) =>
		fetchApi<CustomTest[]>(`/custom-tests/public/search?query=${encodeURIComponent(query)}`),

	getById: (id: string) =>
		fetchApi<CustomTestDetail>(`/custom-tests/${id}`),

	update: (id: string, data: CreateCustomTestRequest) =>
		fetchApi<CustomTestDetail>(`/custom-tests/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
		}),

	delete: (id: string) =>
		fetchApi<void>(`/custom-tests/${id}`, {
			method: 'DELETE',
		}),
};

// Favorites API
export const favoritesApi = {
	addFavorite: (customTestId: string) =>
		fetchApi<void>('/favorites', {
			method: 'POST',
			body: JSON.stringify({ customTestId }),
		}),

	removeFavorite: (customTestId: string) =>
		fetchApi<void>(`/favorites/${customTestId}`, {
			method: 'DELETE',
		}),

	getFavorites: () =>
		fetchApi<CustomTest[]>('/favorites'),
};

// User Settings API
export const settingsApi = {
	getUserSettings: () =>
		fetchApi<UserSettings>('/user/settings'),

	updateUserSettings: (data: UpdateUserSettingsRequest) =>
		fetchApi<UserSettings>('/user/settings', {
			method: 'PUT',
			body: JSON.stringify(data),
		}),

	getThemes: () =>
		fetchApi<Theme[]>('/themes'),
};
