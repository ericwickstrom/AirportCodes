import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';

export default function Settings() {
	const { user } = useAuthStore();
	const [isSaving, setIsSaving] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	// Form state
	const [defaultQuizLength, setDefaultQuizLength] = useState<number | null>(null);
	const [selectedTheme, setSelectedTheme] = useState<string>('light');
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

	const handleCancel = () => {
		// Reset form to original values
		setDefaultQuizLength(null);
		setSelectedTheme('light');
		setEmailNotifications(true);
	};

	const quizLengthOptions = [5, 10, 15, 20, 25, 50];

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				<h1 className="text-4xl font-bold text-gray-900">Settings</h1>

				{/* Account Information */}
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<input
								type="text"
								value={user?.email || ''}
								disabled
								className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Account Created
							</label>
							<input
								type="text"
								value="January 1, 2025"
								disabled
								className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
							/>
						</div>
						<div>
							<button
								disabled
								className="px-4 py-2 text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
							>
								Change Password (Coming Soon)
							</button>
						</div>
					</div>
				</div>

				{/* Quiz Preferences */}
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900">Quiz Preferences</h2>
					<div className="space-y-4">
						<div>
							<label htmlFor="quiz-length" className="block text-sm font-medium text-gray-700 mb-2">
								Default Quiz Length
							</label>
							<select
								id="quiz-length"
								value={defaultQuizLength || ''}
								onChange={(e) => setDefaultQuizLength(e.target.value ? Number(e.target.value) : null)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							>
								<option value="">Select a default length</option>
								{quizLengthOptions.map((length) => (
									<option key={length} value={length}>
										{length} questions
									</option>
								))}
							</select>
							<p className="text-xs text-gray-500 mt-1">
								Choose a default number of questions for quizzes
							</p>
						</div>
					</div>
				</div>

				{/* Appearance */}
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900">Appearance</h2>
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Theme
							</label>
							<div className="space-y-2">
								{['light', 'dark', 'system'].map((theme) => (
									<label key={theme} className="flex items-center space-x-3 cursor-pointer">
										<input
											type="radio"
											name="theme"
											value={theme}
											checked={selectedTheme === theme}
											onChange={(e) => setSelectedTheme(e.target.value)}
											className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
										/>
										<span className="text-gray-700 capitalize">{theme}</span>
									</label>
								))}
							</div>
							<p className="text-xs text-gray-500 mt-2">
								System theme will match your device's theme preference
							</p>
						</div>
					</div>
				</div>

				{/* Notifications */}
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					<h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<label htmlFor="email-notifications" className="text-sm font-medium text-gray-700">
									Email Notifications
								</label>
								<p className="text-xs text-gray-500 mt-1">
									Receive updates and announcements via email
								</p>
							</div>
							<button
								id="email-notifications"
								type="button"
								onClick={() => setEmailNotifications(!emailNotifications)}
								className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
									emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
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
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-2 border-red-200">
					<h2 className="text-2xl font-bold text-red-900">Danger Zone</h2>
					<div className="space-y-4">
						<div>
							<button
								disabled
								className="px-4 py-2 text-red-400 bg-red-50 rounded-lg cursor-not-allowed"
							>
								Delete Account (Coming Soon)
							</button>
							<p className="text-xs text-gray-500 mt-2">
								Permanently delete your account and all associated data
							</p>
						</div>
					</div>
				</div>

				{/* Save/Cancel Buttons */}
				<div className="bg-white rounded-2xl shadow-xl p-6">
					<div className="flex items-center justify-between">
						<div>
							{saveSuccess && (
								<span className="text-green-600 font-medium">Settings saved successfully!</span>
							)}
							{saveError && (
								<span className="text-red-600 font-medium">{saveError}</span>
							)}
						</div>
						<div className="flex gap-3">
							<button
								onClick={handleCancel}
								disabled={isSaving}
								className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={isSaving}
								className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
							>
								{isSaving ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
