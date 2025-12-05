interface LoadingStateProps {
	message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 min-h-full flex items-center justify-center">
			<div className="text-center">
				<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 dark:border-indigo-500 mx-auto"></div>
				<p className="mt-4 text-gray-700 dark:text-gray-300 font-semibold">{message}</p>
			</div>
		</div>
	);
}
