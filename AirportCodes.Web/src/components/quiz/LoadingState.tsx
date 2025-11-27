interface LoadingStateProps {
	message?: string;
}

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full flex items-center justify-center">
			<div className="text-center">
				<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
				<p className="mt-4 text-gray-700 font-semibold">{message}</p>
			</div>
		</div>
	);
}
