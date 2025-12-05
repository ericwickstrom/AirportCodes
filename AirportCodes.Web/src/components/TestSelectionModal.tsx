import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import { customTestApi } from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { loadSessionFromStorage } from '../stores/quizStore';
import type { CustomTest } from '../types';

interface TestSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	mode: 'learning' | 'test';
}

export default function TestSelectionModal({ isOpen, onClose, mode }: TestSelectionModalProps) {
	const navigate = useNavigate();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const [publicTests, setPublicTests] = useState<CustomTest[]>([]);
	const [userTests, setUserTests] = useState<CustomTest[]>([]);
	const [isLoadingPublic, setIsLoadingPublic] = useState(false);
	const [isLoadingUser, setIsLoadingUser] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showActiveSessionModal, setShowActiveSessionModal] = useState(false);

	useEffect(() => {
		// Reset state when modal closes
		if (!isOpen) {
			setShowActiveSessionModal(false);
			return;
		}

		// Check for active test session only in test mode
		if (mode === 'test') {
			const { sessionId } = loadSessionFromStorage();
			if (sessionId) {
				setShowActiveSessionModal(true);
				return; // Don't load tests yet
			}
		}

		// Load tests if no active session or in learning mode
		loadPublicTests();
		if (isAuthenticated) {
			loadUserTests();
		}
	}, [isOpen, mode, isAuthenticated]);

	const loadPublicTests = async () => {
		setIsLoadingPublic(true);
		setError(null);
		try {
			const tests = await customTestApi.getPublicTests();
			setPublicTests(tests);
		} catch (err) {
			console.error('Failed to load public tests:', err);
			setError('Failed to load public tests');
		} finally {
			setIsLoadingPublic(false);
		}
	};

	const loadUserTests = async () => {
		setIsLoadingUser(true);
		try {
			const tests = await customTestApi.getUserTests();
			setUserTests(tests);
		} catch (err) {
			console.error('Failed to load user tests:', err);
		} finally {
			setIsLoadingUser(false);
		}
	};

	const handleRandomPractice = () => {
		onClose();
		navigate(mode === 'learning' ? '/learning' : '/test');
	};

	const handleTestSelect = (testId: string) => {
		onClose();
		navigate(mode === 'learning' ? `/learning/${testId}` : `/test/${testId}`);
	};

	const handleReturnToTest = () => {
		setShowActiveSessionModal(false);
		onClose();
		navigate('/test');
	};

	const handleStartNewTest = () => {
		// Clear session from localStorage
		localStorage.removeItem('test_session_id');
		localStorage.removeItem('test_custom_test_id');
		localStorage.removeItem('test_correct_count');
		setShowActiveSessionModal(false);
		// Now load tests since session is cleared
		loadPublicTests();
		if (isAuthenticated) {
			loadUserTests();
		}
	};

	const modeTitle = mode === 'learning' ? 'Choose Your Practice' : 'Choose Your Test';
	const randomTitle = mode === 'learning' ? 'Random Practice' : 'Random Test';
	const randomDescription = mode === 'learning'
		? 'Unlimited questions from all airports'
		: 'Take a test with random airports';

	return (
		<>
			<Modal isOpen={isOpen && !showActiveSessionModal} onClose={onClose} title={modeTitle}>
				<div className="space-y-6">
				{/* Random Practice/Test */}
				<button
					onClick={handleRandomPractice}
					className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl p-6 transition-all shadow-lg hover:shadow-xl"
				>
					<div className="flex items-center gap-4">
						<div className="text-4xl">🎲</div>
						<div className="text-left">
							<h3 className="text-xl font-bold">{randomTitle}</h3>
							<p className="text-indigo-100 text-sm">{randomDescription}</p>
						</div>
					</div>
				</button>

				{/* My Tests (if authenticated) */}
				{isAuthenticated && (
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-3">My Tests</h3>
						{isLoadingUser ? (
							<p className="text-gray-500 text-center py-4">Loading...</p>
						) : userTests.length === 0 ? (
							<p className="text-gray-500 text-center py-4 text-sm">No custom tests yet</p>
						) : (
							<div className="space-y-2 max-h-48 overflow-y-auto">
								{userTests.map((test) => (
									<button
										key={test.id}
										onClick={() => handleTestSelect(test.id)}
										className="w-full border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
									>
										<div className="flex justify-between items-center">
											<div>
												<h4 className="font-semibold text-gray-900">{test.name}</h4>
												<p className="text-sm text-gray-500">
													{test.airportCount} {test.airportCount === 1 ? 'airport' : 'airports'}
												</p>
											</div>
											<div className="text-indigo-600 font-medium text-sm">
												{mode === 'learning' ? 'Practice →' : 'Take Test →'}
											</div>
										</div>
									</button>
								))}
							</div>
						)}
					</div>
				)}

				{/* Public Tests */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-3">Public Tests</h3>
					{isLoadingPublic ? (
						<p className="text-gray-500 text-center py-4">Loading...</p>
					) : error ? (
						<p className="text-red-600 text-center py-4 text-sm">{error}</p>
					) : publicTests.length === 0 ? (
						<p className="text-gray-500 text-center py-4 text-sm">No public tests available</p>
					) : (
						<div className="space-y-2 max-h-64 overflow-y-auto">
							{publicTests.map((test) => (
								<button
									key={test.id}
									onClick={() => handleTestSelect(test.id)}
									className="w-full border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
								>
									<div className="flex justify-between items-center">
										<div>
											<h4 className="font-semibold text-gray-900">{test.name}</h4>
											<p className="text-sm text-gray-500">
												{test.airportCount} {test.airportCount === 1 ? 'airport' : 'airports'}
												{test.creatorName && ` • by ${test.creatorName}`}
											</p>
										</div>
										<div className="text-indigo-600 font-medium text-sm">
											{mode === 'learning' ? 'Practice →' : 'Take Test →'}
										</div>
									</div>
								</button>
							))}
						</div>
					)}
				</div>
				</div>
			</Modal>

			<ConfirmModal
				isOpen={showActiveSessionModal}
				title="Active Test Detected"
				message="You have an active test in progress. Would you like to return to it or start a new test?"
				confirmText="Return to Test"
				cancelText="Start New Test"
				onConfirm={handleReturnToTest}
				onCancel={handleStartNewTest}
				variant="warning"
			/>
		</>
	);
}
