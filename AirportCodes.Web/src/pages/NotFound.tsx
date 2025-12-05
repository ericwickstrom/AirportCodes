import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8 min-h-full">
			<div className="max-w-2xl w-full text-center space-y-8">
				<div className="space-y-4">
					<div className="text-8xl">✈️</div>
					<h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
					<p className="text-2xl text-gray-600 dark:text-gray-300">This route doesn't exist</p>
					<p className="text-gray-500 dark:text-gray-400">
						Looks like you've wandered off course. Let's get you back on track.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						to="/"
						className="bg-blue-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-indigo-600 transition-colors"
					>
						Go Home
					</Link>
					<Link
						to="/learning"
						className="bg-white dark:bg-gray-700 text-blue-600 dark:text-indigo-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border-2 border-blue-600 dark:border-indigo-500"
					>
						Start Learning
					</Link>
				</div>
			</div>
		</div>
	);
}
