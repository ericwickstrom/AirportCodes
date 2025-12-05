import { useState } from 'react';
import { Link } from 'react-router-dom';
import TestSelectionModal from '../components/TestSelectionModal';

export default function Home() {
	const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
	const [isTestModalOpen, setIsTestModalOpen] = useState(false);

	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8 min-h-full">
			<div className="max-w-4xl w-full space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">AirportCodes</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">Master IATA airport codes from around the world</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<button
						onClick={() => setIsLearningModalOpen(true)}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow space-y-4 text-left cursor-pointer"
					>
						<div className="text-4xl">📚</div>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Learning Mode</h2>
						<p className="text-gray-600 dark:text-gray-300">
							Practice with multiple choice questions and detailed feedback
						</p>
					</button>

					<button
						onClick={() => setIsTestModalOpen(true)}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow space-y-4 text-left cursor-pointer"
					>
						<div className="text-4xl">✅</div>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Test Mode</h2>
						<p className="text-gray-600 dark:text-gray-300">
							Take a timed test and track your progress
						</p>
					</button>
				</div>

				<div className="text-center">
					<Link
						to="/login"
						className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold"
					>
						Sign in to track your progress
					</Link>
				</div>
			</div>

			<TestSelectionModal
				isOpen={isLearningModalOpen}
				onClose={() => setIsLearningModalOpen(false)}
				mode="learning"
			/>

			<TestSelectionModal
				isOpen={isTestModalOpen}
				onClose={() => setIsTestModalOpen(false)}
				mode="test"
			/>
		</div>
	);
}
