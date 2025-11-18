import { create } from 'zustand';
import { authApi } from '../services/api';
import type { User, LoginRequest, RegisterRequest } from '../types';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;

	// Actions
	login: (credentials: LoginRequest) => Promise<void>;
	register: (credentials: RegisterRequest) => Promise<void>;
	logout: () => void;
	clearError: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,

	login: async (credentials) => {
		set({ isLoading: true, error: null });
		try {
			const response = await authApi.login(credentials);
			localStorage.setItem('auth_token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			set({
				user: response.user,
				token: response.token,
				isAuthenticated: true,
				isLoading: false,
			});
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
			localStorage.setItem('auth_token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			set({
				user: response.user,
				token: response.token,
				isAuthenticated: true,
				isLoading: false,
			});
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Registration failed',
				isLoading: false,
			});
			throw error;
		}
	},

	logout: () => {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user');
		set({
			user: null,
			token: null,
			isAuthenticated: false,
			error: null,
		});
	},

	clearError: () => set({ error: null }),

	initializeAuth: () => {
		const token = localStorage.getItem('auth_token');
		const userStr = localStorage.getItem('user');

		if (token && userStr) {
			try {
				const user = JSON.parse(userStr);
				set({
					user,
					token,
					isAuthenticated: true,
				});
			} catch {
				// Invalid stored data, clear it
				localStorage.removeItem('auth_token');
				localStorage.removeItem('user');
			}
		}
	},
}));
