import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { FormInput } from '../components/FormInput';

export default function Login() {
	const navigate = useNavigate();
	const { login, isLoading, error, clearError } = useAuthStore();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});

	const validateForm = (): boolean => {
		const errors: { email?: string; password?: string } = {};

		// Email validation
		if (!email) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address';
		}

		// Password validation
		if (!password) {
			errors.password = 'Password is required';
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		clearError();

		if (!validateForm()) {
			return;
		}

		try {
			await login({ email, password });
			navigate('/dashboard');
		} catch (err: any) {
			// Check if error is due to unconfirmed email
			if (err?.emailNotConfirmed) {
				navigate('/confirmation-pending', { state: { email } });
			}
			// Error is handled by the auth store
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">Sign In</h1>
					<p className="text-gray-600 dark:text-gray-300 text-center mt-2">Welcome back to AirportCodes</p>
				</div>

				{error && (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<FormInput
						id="email"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={validationErrors.email}
						placeholder="you@example.com"
						disabled={isLoading}
						autoComplete="email"
					/>

					<FormInput
						id="password"
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={validationErrors.password}
						placeholder="Enter your password"
						disabled={isLoading}
						showPasswordToggle
						autoComplete="current-password"
					/>

					<div className="flex items-center justify-between">
						<Link to="#" className="text-sm text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300">
							Forgot password?
						</Link>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 dark:bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-indigo-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
					>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<div className="text-center">
					<p className="text-gray-600 dark:text-gray-300">
						Don't have an account?{' '}
						<Link to="/register" className="text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300 font-semibold">
							Create one
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
