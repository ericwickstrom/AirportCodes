interface FeedbackPanelProps {
	isCorrect: boolean;
	correctAnswer: string;
	explanation?: string;
}

export default function FeedbackPanel({ isCorrect, correctAnswer, explanation }: FeedbackPanelProps) {
	return (
		<div
			className={`p-6 rounded-lg ${
				isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
			}`}
		>
			<div className="flex items-start gap-3">
				<div className="text-3xl">{isCorrect ? '✅' : '❌'}</div>
				<div className="flex-1">
					<p className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
						{isCorrect ? 'Correct!' : 'Incorrect'}
					</p>
					{!isCorrect && !explanation && (
						<p className="text-red-700">
							The correct answer is <strong>{correctAnswer}</strong>
						</p>
					)}
					{explanation && (
						<p className={isCorrect ? 'text-green-700' : 'text-red-700'}>{explanation}</p>
					)}
				</div>
			</div>
		</div>
	);
}
