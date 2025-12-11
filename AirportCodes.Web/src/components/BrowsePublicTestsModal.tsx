import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { customTestApi } from '../services/api';
import type { CustomTest } from '../types';

interface BrowsePublicTestsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function BrowsePublicTestsModal({ isOpen, onClose }: BrowsePublicTestsModalProps) {
	const navigate = useNavigate();
	const [tests, setTests] = useState<CustomTest[]>([]);
	const [filteredTests, setFilteredTests] = useState<CustomTest[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen) {
			loadTests();
			setSearchQuery('');
		}
	}, [isOpen]);

	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredTests(tests);
		} else {
			const query = searchQuery.toLowerCase();
			const filtered = tests.filter(test =>
				test.name.toLowerCase().includes(query) ||
				(test.creatorName && test.creatorName.toLowerCase().includes(query))
			);
			setFilteredTests(filtered);
		}
	}, [searchQuery, tests]);

	const loadTests = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const publicTests = await customTestApi.getPublicTests();
			setTests(publicTests);
			setFilteredTests(publicTests);
		} catch (err) {
			console.error('Failed to load public tests:', err);
			setError('Failed to load public tests');
		} finally {
			setIsLoading(false);
		}
	};

	const handleStartTest = (testId: string) => {
		onClose();
		navigate(`/test/${testId}`);
	};

	const formatTimerDuration = (seconds?: number) => {
		if (!seconds) return 'No timer';
		const minutes = Math.floor(seconds / 60);
		return minutes === 1 ? '1 minute' : `${minutes} minutes`;
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Browse Public Tests">
			<div className="space-y-4">
				{/* Search Input */}
				<div className="relative">
					<input
						type="text"
						placeholder="Search tests by name or creator..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
					/>
					<svg
						className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>

				{/* Tests List */}
				<div className="h-96 overflow-y-auto">
					{isLoading ? (
						<p className="text-gray-500 dark:text-gray-400 text-center py-8">Loading...</p>
					) : error ? (
						<p className="text-red-600 dark:text-red-400 text-center py-8">{error}</p>
					) : filteredTests.length === 0 ? (
						<p className="text-gray-500 dark:text-gray-400 text-center py-8">
							{searchQuery ? 'No tests found matching your search' : 'No public tests available yet'}
						</p>
					) : (
						<div className="space-y-3">
							{filteredTests.map((test) => (
							<div
								key={test.id}
								className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
							>
								<div className="flex justify-between items-start gap-4">
									<div className="flex-1">
										<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
											{test.name}
										</h3>
										<div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
											<span className="flex items-center gap-1">
												<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
												</svg>
												{test.airportCount} {test.airportCount === 1 ? 'airport' : 'airports'}
											</span>
											{test.timerEnabled && (
												<span className="flex items-center gap-1">
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													{formatTimerDuration(test.timerDurationSeconds)}
												</span>
											)}
											{test.creatorName && (
												<span className="flex items-center gap-1">
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
													</svg>
													{test.creatorName}
												</span>
											)}
										</div>
									</div>
									<button
										onClick={() => handleStartTest(test.id)}
										className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
									>
										Start Test
									</button>
								</div>
							</div>
						))}
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
}
