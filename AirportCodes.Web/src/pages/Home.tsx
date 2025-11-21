import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateTestModal from '../components/CreateTestModal';
import ViewCustomTestsModal from '../components/ViewCustomTestsModal';

export default function Home() {
	const [isCreateTestModalOpen, setIsCreateTestModalOpen] = useState(false);
	const [isViewTestsModalOpen, setIsViewTestsModalOpen] = useState(false);

	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8 min-h-full">
			<div className="max-w-4xl w-full space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-6xl font-bold text-gray-900">AirportCodes</h1>
					<p className="text-xl text-gray-600">Master IATA airport codes from around the world</p>
				</div>

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

				<div className="text-center space-y-4">
					<div className="flex gap-4 justify-center">
						<button
							onClick={() => setIsCreateTestModalOpen(true)}
							className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
						>
							Create Test (Temp - Phase 8.3)
						</button>
						<button
							onClick={() => setIsViewTestsModalOpen(true)}
							className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
						>
							View Custom Tests (Temp - Phase 8.3)
						</button>
					</div>
					<div>
						<Link
							to="/login"
							className="text-indigo-600 hover:text-indigo-800 font-semibold"
						>
							Sign in to track your progress
						</Link>
					</div>
				</div>
			</div>

			<CreateTestModal
				isOpen={isCreateTestModalOpen}
				onClose={() => setIsCreateTestModalOpen(false)}
			/>
			<ViewCustomTestsModal
				isOpen={isViewTestsModalOpen}
				onClose={() => setIsViewTestsModalOpen(false)}
			/>
		</div>
	);
}
