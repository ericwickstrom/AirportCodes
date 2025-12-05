import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function ConfirmationPending() {
	const location = useLocation();
	const email = location.state?.email || '';
	const [isResending, setIsResending] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleResend = async () => {
		if (!email) {
			setError('Email address not found. Please register again.');
			return;
		}

		setIsResending(true);
		setMessage('');
		setError('');

		try {
			const response = await authApi.resendConfirmation({ email });
			setMessage(response.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to resend confirmation email');
		} finally {
			setIsResending(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
				<div className="text-center space-y-4">
					<div className="text-6xl">📧</div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Check Your Email</h1>
					<p className="text-gray-600 dark:text-gray-300">
						We've sent a confirmation email to:
					</p>
					{email && <p className="font-semibold text-blue-600 dark:text-indigo-400">{email}</p>}
				</div>

				<div className="space-y-4">
					<p className="text-gray-600 dark:text-gray-300 text-center">
						Click the confirmation link in the email to activate your account.
					</p>

					{message && (
						<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
							{message}
						</div>
					)}

					{error && (
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<div className="text-center space-y-3">
						<p className="text-sm text-gray-500 dark:text-gray-400">Didn't receive the email?</p>
						<button
							onClick={handleResend}
							disabled={isResending || !email}
							className="w-full bg-blue-600 dark:bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-indigo-600 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
						>
							{isResending ? 'Sending...' : 'Resend Confirmation Email'}
						</button>
					</div>

					<div className="text-center pt-4">
						<Link to="/login" className="text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300 text-sm">
							Back to Login
						</Link>
					</div>
				</div>

				<div className="border-t dark:border-gray-700 pt-4">
					<p className="text-xs text-gray-500 dark:text-gray-400 text-center">
						Check your spam folder if you don't see the email in your inbox.
					</p>
				</div>
			</div>
		</div>
	);
}
