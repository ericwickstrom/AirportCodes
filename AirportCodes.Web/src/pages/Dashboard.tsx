import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateTestModal from '../components/CreateTestModal';
import ConfirmModal from '../components/ConfirmModal';
import { customTestApi } from '../services/api';
import type { CustomTest } from '../types';

export default function Dashboard() {
	const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false);
	const [tests, setTests] = useState<CustomTest[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [deleteConfirmModal, setDeleteConfirmModal] = useState<{ isOpen: boolean; test: CustomTest | null }>({
		isOpen: false,
		test: null,
	});
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		loadTests();
	}, []);

	const loadTests = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const userTests = await customTestApi.getUserTests();
			setTests(userTests);
		} catch (err) {
			console.error('Failed to load custom tests:', err);
			setError('Failed to load custom tests');
		} finally {
			setIsLoading(false);
		}
	};

	const handleTestCreated = () => {
		loadTests();
	};

	const handleDeleteClick = (test: CustomTest) => {
		setDeleteConfirmModal({ isOpen: true, test });
	};

	const handleDeleteCancel = () => {
		setDeleteConfirmModal({ isOpen: false, test: null });
	};

	const handleDeleteConfirm = async () => {
		if (!deleteConfirmModal.test) return;

		setIsDeleting(true);
		try {
			await customTestApi.delete(deleteConfirmModal.test.id);
			setDeleteConfirmModal({ isOpen: false, test: null });
			loadTests();
		} catch (err) {
			console.error('Failed to delete custom test:', err);
			setError('Failed to delete custom test');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<div className="max-w-6xl mx-auto space-y-6">
				<h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

				<div className="grid md:grid-cols-2 gap-6">
					<Link
						to="/learning"
						className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow space-y-4"
					>
						<div className="text-4xl">📚</div>
						<h2 className="text-2xl font-bold text-gray-900">Learning Mode</h2>
						<p className="text-gray-600">
							Practice with multiple choice questions and detailed feedback
						</p>
					</Link>

					<Link
						to="/test"
						className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow space-y-4"
					>
						<div className="text-4xl">✅</div>
						<h2 className="text-2xl font-bold text-gray-900">Test Mode</h2>
						<p className="text-gray-600">
							Take a timed test and track your progress
						</p>
					</Link>
				</div>

				{/* My Tests Section */}
				<div className="bg-white rounded-2xl shadow-xl p-8">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-bold text-gray-900">My Tests</h2>
						<button
							onClick={() => setIsCreateTestModalOpen(true)}
							className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
						>
							Create Test
						</button>
					</div>
					{isLoading ? (
						<p className="text-gray-500 text-center py-8">Loading...</p>
					) : error ? (
						<p className="text-red-600 text-center py-8">{error}</p>
					) : tests.length === 0 ? (
						<p className="text-gray-500 text-center py-8">
							No custom tests yet. Click "Create Custom Test" to get started!
						</p>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{tests.map((test) => (
								<div
									key={test.id}
									className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors space-y-3"
								>
									<div>
										<h3 className="font-semibold text-gray-900 text-lg">{test.name}</h3>
										<p className="text-sm text-gray-500">
											{test.airportCount} {test.airportCount === 1 ? 'airport' : 'airports'}
										</p>
									</div>
									<div className="flex gap-2 text-xs">
										<span className={`px-2 py-1 rounded ${test.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
											{test.isPublic ? 'Public' : 'Private'}
										</span>
										{test.timerEnabled && (
											<span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
												Timed
											</span>
										)}
									</div>
									<div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
										<div className="flex gap-2">
											<Link
												to={`/learning/${test.id}`}
												className="flex-1 px-3 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium transition-colors text-center"
											>
												Practice
											</Link>
											<Link
												to={`/test/${test.id}`}
												className="flex-1 px-3 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors text-center"
											>
												Take Test
											</Link>
										</div>
										<div className="flex gap-2">
											<button
												className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
												onClick={() => {/* TODO: Edit test */}}
											>
												Edit
											</button>
											<button
												className="flex-1 px-3 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-medium transition-colors"
												onClick={() => handleDeleteClick(test)}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<CreateTestModal
				isOpen={isCreateTestModalOpen}
				onClose={() => setIsCreateTestModalOpen(false)}
				onTestCreated={handleTestCreated}
			/>

			<ConfirmModal
				isOpen={deleteConfirmModal.isOpen}
				title="Delete Custom Test"
				message={`Are you sure you want to delete "${deleteConfirmModal.test?.name}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				onConfirm={handleDeleteConfirm}
				onCancel={handleDeleteCancel}
				variant="danger"
				isLoading={isDeleting}
			/>
		</div>
	);
}
