import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useTheme } from '../hooks/useTheme';

export default function Settings() {
	const navigate = useNavigate();
	const { user } = useAuthStore();
	const { theme, setTheme } = useSettingsStore();
	useTheme(); // Apply theme changes immediately

	const [isSaving, setIsSaving] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	// Form state
	const [defaultQuizLength, setDefaultQuizLength] = useState<number | null>(null);
	const [emailNotifications, setEmailNotifications] = useState(true);

	const handleSave = async () => {
		setIsSaving(true);
		setSaveSuccess(false);
		setSaveError(null);

		try {
			// TODO: Call API to save settings
			// await settingsApi.updateUserSettings({ ... });

			// Simulate save
			await new Promise(resolve => setTimeout(resolve, 1000));
			setSaveSuccess(true);
			setTimeout(() => setSaveSuccess(false), 3000);
		} catch (error) {
			console.error('Failed to save settings:', error);
			setSaveError(error instanceof Error ? error.message : 'Failed to save settings');
		} finally {
			setIsSaving(false);
		}
	};

	const handleUndo = () => {
		// Reset form to original values
		setDefaultQuizLength(null);
		setEmailNotifications(true);
		// Note: Theme is not reset as it changes instantly
	};

	const handleBack = () => {
		if (user) {
			navigate('/dashboard');
		} else {
			navigate('/');
		}
	};

	const quizLengthOptions = [5, 10, 15, 20, 25, 50];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<button
							onClick={handleBack}
							className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors cursor-pointer"
							aria-label="Go back"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
					</div>
					<div className="flex items-center gap-3">
						{saveSuccess && <span className="text-green-600 dark:text-green-400 font-medium">Settings saved!</span>}
						{saveError && <span className="text-red-600 dark:text-red-400 font-medium">{saveError}</span>}
						<button
							onClick={handleUndo}
							disabled={isSaving}
							aria-label="Undo changes"
							className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
						>
							Undo
						</button>
						<button
							onClick={handleSave}
							disabled={isSaving}
							aria-label={isSaving ? 'Saving changes' : 'Save changes'}
							className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
						>
							{isSaving ? 'Saving...' : 'Save Changes'}
						</button>
					</div>
				</div>

				{/* Account Information */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Information</h2>
					<div className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Email
							</label>
							<input
								id="email"
								type="text"
								value={user?.email || ''}
								disabled
								aria-label="Email address"
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
							/>
						</div>
						<div>
							<label htmlFor="account-created" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Account Created
							</label>
							<input
								id="account-created"
								type="text"
								value="January 1, 2025"
								disabled
								aria-label="Account creation date"
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
							/>
						</div>
						<div>
							<button
								disabled
								aria-label="Change password - Coming soon"
								className="px-4 py-2 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-not-allowed"
							>
								Change Password (Coming Soon)
							</button>
						</div>
					</div>
				</div>

				{/* Quiz Preferences */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quiz Preferences</h2>
					<div className="space-y-4">
						<div>
							<label htmlFor="quiz-length" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Default Quiz Length
							</label>
							<select
								id="quiz-length"
								value={defaultQuizLength || ''}
								onChange={(e) => setDefaultQuizLength(e.target.value ? Number(e.target.value) : null)}
								className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								<option value="">Select a default length</option>
								{quizLengthOptions.map((length) => (
									<option key={length} value={length}>
										{length} questions
									</option>
								))}
							</select>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
								Choose a default number of questions for quizzes
							</p>
						</div>
					</div>
				</div>

				{/* Appearance */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Appearance</h2>
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Theme
							</label>
							<div className="space-y-2" role="radiogroup" aria-label="Theme selection">
								{(['light', 'dark', 'system'] as const).map((themeOption) => (
									<label key={themeOption} className="flex items-center space-x-3 cursor-pointer">
										<input
											type="radio"
											name="theme"
											value={themeOption}
											checked={theme === themeOption}
											onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
											aria-label={`${themeOption.charAt(0).toUpperCase() + themeOption.slice(1)} theme`}
											className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
										/>
										<span className="text-gray-700 dark:text-gray-300 capitalize">{themeOption}</span>
									</label>
								))}
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
								System theme will match your device's theme preference
							</p>
						</div>
					</div>
				</div>

				{/* Notifications */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notifications</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<label htmlFor="email-notifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
									Email Notifications
								</label>
								<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
									Receive updates and announcements via email
								</p>
							</div>
							<button
								id="email-notifications"
								type="button"
								role="switch"
								aria-checked={emailNotifications ? "true" : "false"}
								aria-label="Toggle email notifications"
								onClick={() => setEmailNotifications(!emailNotifications)}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
									emailNotifications ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'
								}`}
							>
								<span
									className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
										emailNotifications ? 'translate-x-6' : 'translate-x-1'
									}`}
								/>
							</button>
						</div>
					</div>
				</div>

				{/* Danger Zone */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 border-2 border-red-200 dark:border-red-900">
					<h2 className="text-2xl font-bold text-red-900 dark:text-red-400">Danger Zone</h2>
					<div className="space-y-4">
						<div>
							<button
								disabled
								aria-label="Delete account - Coming soon"
								className="px-4 py-2 text-red-400 dark:text-red-500 bg-red-50 dark:bg-red-950 rounded-lg cursor-not-allowed"
							>
								Delete Account (Coming Soon)
							</button>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
								Permanently delete your account and all associated data
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
