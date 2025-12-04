import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { authApi } from '../services/api';
import type { User, LoginRequest, RegisterRequest } from '../types';

interface JwtPayload {
	exp: number;
	sub: string;
	email: string;
}

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	refreshTimerId: number | null;

	// Actions
	login: (credentials: LoginRequest) => Promise<void>;
	register: (credentials: RegisterRequest) => Promise<void>;
	logout: () => void;
	clearError: () => void;
	initializeAuth: () => Promise<void>;
	refreshToken: () => Promise<void>;
	startTokenRefreshTimer: () => void;
	stopTokenRefreshTimer: () => void;
}

// Helper function to check if token is expired
const isTokenExpired = (token: string): boolean => {
	try {
		const decoded = jwtDecode<JwtPayload>(token);
		const currentTime = Date.now() / 1000;
		return decoded.exp < currentTime;
	} catch {
		return true;
	}
};

// Helper function to get time until token expiry (in milliseconds)
const getTimeUntilExpiry = (token: string): number => {
	try {
		const decoded = jwtDecode<JwtPayload>(token);
		const currentTime = Date.now() / 1000;
		const timeUntilExpiry = (decoded.exp - currentTime) * 1000;
		return Math.max(0, timeUntilExpiry);
	} catch {
		return 0;
	}
};

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: true, // Start with loading true until auth is initialized
	error: null,
	refreshTimerId: null,

	login: async (credentials) => {
		set({ isLoading: true, error: null });
		try {
			const response = await authApi.login(credentials);
			localStorage.setItem('auth_token', response.accessToken);
			localStorage.setItem('refresh_token', response.refreshToken);
			localStorage.setItem('user', JSON.stringify(response.user));
			set({
				user: response.user,
				token: response.accessToken,
				isAuthenticated: true,
				isLoading: false,
			});
			get().startTokenRefreshTimer();
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Login failed',
				isLoading: false,
			});
			throw error;
		}
	},

	register: async (credentials) => {
		set({ isLoading: true, error: null });
		try {
			const response = await authApi.register(credentials);
			localStorage.setItem('auth_token', response.accessToken);
			localStorage.setItem('refresh_token', response.refreshToken);
			localStorage.setItem('user', JSON.stringify(response.user));
			set({
				user: response.user,
				token: response.accessToken,
				isAuthenticated: true,
				isLoading: false,
			});
			get().startTokenRefreshTimer();
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Registration failed',
				isLoading: false,
			});
			throw error;
		}
	},

	logout: () => {
		get().stopTokenRefreshTimer();
		localStorage.removeItem('auth_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('user');
		set({
			user: null,
			token: null,
			isAuthenticated: false,
			error: null,
		});
		window.location.href = '/';
	},

	clearError: () => set({ error: null }),

	initializeAuth: async () => {
		set({ isLoading: true });

		const token = localStorage.getItem('auth_token');
		const refreshToken = localStorage.getItem('refresh_token');
		const userStr = localStorage.getItem('user');

		if (token && userStr) {
			try {
				// Check if token is expired
				if (isTokenExpired(token)) {
					// If we have a refresh token, try to refresh
					if (refreshToken) {
						await useAuthStore.getState().refreshToken();
					} else {
						// No refresh token, clear everything
						localStorage.removeItem('auth_token');
						localStorage.removeItem('refresh_token');
						localStorage.removeItem('user');
						set({ isLoading: false });
					}
					return;
				}

				const user = JSON.parse(userStr);
				set({
					user,
					token,
					isAuthenticated: true,
					isLoading: false,
				});
				get().startTokenRefreshTimer();
			} catch {
				// Invalid stored data, clear it
				localStorage.removeItem('auth_token');
				localStorage.removeItem('refresh_token');
				localStorage.removeItem('user');
				set({ isLoading: false });
			}
		} else {
			set({ isLoading: false });
		}
	},

	refreshToken: async () => {
		const refreshToken = localStorage.getItem('refresh_token');
		if (!refreshToken) {
			useAuthStore.getState().logout();
			return;
		}

		try {
			const response = await authApi.refresh({ refreshToken });
			localStorage.setItem('auth_token', response.accessToken);
			localStorage.setItem('refresh_token', response.refreshToken);
			localStorage.setItem('user', JSON.stringify(response.user));
			set({
				user: response.user,
				token: response.accessToken,
				isAuthenticated: true,
			});
			get().startTokenRefreshTimer();
		} catch (error) {
			console.error('Failed to refresh token:', error);
			useAuthStore.getState().logout();
		}
	},

	startTokenRefreshTimer: () => {
		const { token, refreshTimerId } = get();

		// Clear existing timer
		if (refreshTimerId) {
			clearTimeout(refreshTimerId);
		}

		if (!token) return;

		const timeUntilExpiry = getTimeUntilExpiry(token);
		// Refresh token 1 minute before it expires
		const refreshTime = Math.max(0, timeUntilExpiry - 60000);

		const timerId = setTimeout(() => {
			get().refreshToken();
		}, refreshTime);

		set({ refreshTimerId: timerId });
	},

	stopTokenRefreshTimer: () => {
		const { refreshTimerId } = get();
		if (refreshTimerId) {
			clearTimeout(refreshTimerId);
			set({ refreshTimerId: null });
		}
	},
}));
