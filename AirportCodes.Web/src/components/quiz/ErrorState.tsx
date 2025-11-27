import QuizLayout from './QuizLayout';

interface ErrorStateProps {
	title: string;
	error: string;
	onRetry?: () => void;
}

export default function ErrorState({ title, error, onRetry }: ErrorStateProps) {
	return (
		<QuizLayout title={title}>
			<div className="bg-red-50 border-2 border-red-200 rounded-2xl shadow-xl p-8">
				<p className="text-red-700 font-semibold">Error: {error}</p>
				{onRetry && (
					<button
						onClick={onRetry}
						className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
					>
						Try Again
					</button>
				)}
			</div>
		</QuizLayout>
	);
}
