import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function ConfirmEmail() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const [isConfirming, setIsConfirming] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const confirmEmail = async () => {
			if (!token) {
				setError('Invalid confirmation link. No token provided.');
				setIsConfirming(false);
				return;
			}

			try {
				await authApi.confirmEmail({ token });
				setSuccess(true);
				setError('');
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to confirm email');
				setSuccess(false);
			} finally {
				setIsConfirming(false);
			}
		};

		confirmEmail();
	}, [token]);

	if (isConfirming) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
				<div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
					<div className="text-center space-y-4">
						<div className="text-6xl animate-pulse">⏳</div>
						<h1 className="text-3xl font-bold text-gray-900">Confirming Email...</h1>
						<p className="text-gray-600">Please wait while we confirm your email address.</p>
					</div>
				</div>
			</div>
		);
	}

	if (success) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
				<div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
					<div className="text-center space-y-4">
						<div className="text-6xl">✅</div>
						<h1 className="text-3xl font-bold text-gray-900">Email Confirmed!</h1>
						<p className="text-gray-600">
							Your email address has been successfully confirmed. You can now log in to your account.
						</p>
					</div>

					<Link
						to="/login"
						className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
					>
						Go to Login
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
				<div className="text-center space-y-4">
					<div className="text-6xl">❌</div>
					<h1 className="text-3xl font-bold text-gray-900">Confirmation Failed</h1>
					<p className="text-gray-600">{error}</p>
				</div>

				<div className="space-y-3">
					<p className="text-sm text-gray-500 text-center">
						This could mean your link has expired or is invalid.
					</p>
					<Link
						to="/login"
						className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
					>
						Back to Login
					</Link>
				</div>
			</div>
		</div>
	);
}
