import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { FormInput } from '../components/FormInput';

interface PasswordStrength {
	score: number;
	label: string;
	color: string;
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
	let score = 0;

	if (password.length >= 8) score++;
	if (password.length >= 12) score++;
	if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^a-zA-Z0-9]/.test(password)) score++;

	if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
	if (score === 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
	if (score === 4) return { score, label: 'Good', color: 'bg-blue-500' };
	return { score, label: 'Strong', color: 'bg-green-500' };
};

export default function Register() {
	const navigate = useNavigate();
	const { register, isLoading, error, clearError } = useAuthStore();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validationErrors, setValidationErrors] = useState<{
		email?: string;
		password?: string;
		confirmPassword?: string;
	}>({});

	const passwordStrength = password ? calculatePasswordStrength(password) : null;

	const validateForm = (): boolean => {
		const errors: { email?: string; password?: string; confirmPassword?: string } = {};

		// Email validation
		if (!email) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address';
		}

		// Password validation
		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		}

		// Confirm password validation
		if (!confirmPassword) {
			errors.confirmPassword = 'Please confirm your password';
		} else if (password !== confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
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
			await register({ email, password });
			navigate('/dashboard');
		} catch (err) {
			// Error is handled by the auth store
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">Create Account</h1>
					<p className="text-gray-600 dark:text-gray-300 text-center mt-2">Join AirportCodes today</p>
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

					<div>
						<FormInput
							id="password"
							label="Password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={validationErrors.password}
							placeholder="Create a strong password"
							disabled={isLoading}
							showPasswordToggle
							autoComplete="new-password"
						/>
						{password && passwordStrength && (
							<div className="mt-2">
								<div className="flex items-center gap-2 mb-1">
									<div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
										<div
											className={`h-full ${passwordStrength.color} transition-all`}
											style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
										/>
									</div>
									<span className="text-xs font-medium text-gray-600 dark:text-gray-300">
										{passwordStrength.label}
									</span>
								</div>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									Use 8+ characters with a mix of letters, numbers & symbols
								</p>
							</div>
						)}
					</div>

					<FormInput
						id="confirmPassword"
						label="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						error={validationErrors.confirmPassword}
						placeholder="Re-enter your password"
						disabled={isLoading}
						showPasswordToggle
						autoComplete="new-password"
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 dark:bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-indigo-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
					>
						{isLoading ? 'Creating account...' : 'Create Account'}
					</button>
				</form>

				<div className="text-center">
					<p className="text-gray-600 dark:text-gray-300">
						Already have an account?{' '}
						<Link to="/login" className="text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300 font-semibold">
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
