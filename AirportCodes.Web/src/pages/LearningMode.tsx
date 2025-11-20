import { useEffect, useState } from 'react';
import { useQuizStore } from '../stores/quizStore';

export default function LearningMode() {
	const {
		learningQuestion,
		learningFeedback,
		isLoading,
		error,
		startLearningMode,
		submitLearningAnswer,
		nextLearningQuestion,
	} = useQuizStore();

	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [questionsAnswered, setQuestionsAnswered] = useState(0);
	const [correctAnswers, setCorrectAnswers] = useState(0);

	// Load first question on mount
	useEffect(() => {
		startLearningMode();
	}, [startLearningMode]);

	const handleAnswerSelect = (answer: string) => {
		if (!learningFeedback) {
			setSelectedAnswer(answer);
		}
	};

	const handleSubmit = async () => {
		if (!selectedAnswer) return;

		const feedback = await submitLearningAnswer(selectedAnswer);
		setQuestionsAnswered((prev) => prev + 1);

		if (feedback?.isCorrect) {
			setCorrectAnswers((prev) => prev + 1);
		}
	};

	const handleNextQuestion = async () => {
		setSelectedAnswer(null);
		await nextLearningQuestion();
	};

	if (error) {
		return (
			<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full">
				<div className="max-w-4xl mx-auto space-y-6">
					<h1 className="text-4xl font-bold text-gray-900">Learning Mode</h1>
					<div className="bg-red-50 border-2 border-red-200 rounded-2xl shadow-xl p-8">
						<p className="text-red-700 font-semibold">Error: {error}</p>
					</div>
				</div>
			</div>
		);
	}

	if (isLoading && !learningQuestion) {
		return (
			<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
					<p className="mt-4 text-gray-700 font-semibold">Loading question...</p>
				</div>
			</div>
		);
	}

	if (!learningQuestion) {
		return null;
	}

	const getButtonClass = (option: string) => {
		const baseClass = 'w-full p-4 text-left rounded-lg font-semibold transition-all';

		if (!learningFeedback) {
			// Before submission
			if (selectedAnswer === option) {
				return `${baseClass} bg-indigo-600 text-white`;
			}
			return `${baseClass} bg-white hover:bg-indigo-50 text-gray-900 border-2 border-gray-200`;
		} else {
			// After submission - show feedback
			if (option === learningFeedback.correctAnswer) {
				return `${baseClass} bg-green-500 text-white`;
			}
			if (selectedAnswer === option && !learningFeedback.isCorrect) {
				return `${baseClass} bg-red-500 text-white`;
			}
			return `${baseClass} bg-gray-100 text-gray-500`;
		}
	};

	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Header with score */}
				<div className="flex items-center justify-between">
					<h1 className="text-4xl font-bold text-gray-900">Learning Mode</h1>
					<div className="text-right">
						<p className="text-sm text-gray-600">Score</p>
						<p className="text-2xl font-bold text-indigo-600">
							{correctAnswers}/{questionsAnswered}
						</p>
					</div>
				</div>

				{/* Question Card */}
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					{/* Airport Information */}
					<div className="space-y-2">
						<p className="text-sm text-gray-500 uppercase tracking-wide">
							What is the IATA code for:
						</p>
						<h2 className="text-3xl font-bold text-gray-900">
							{learningQuestion.airportName}
						</h2>
						<p className="text-lg text-gray-600">
							{learningQuestion.city}, {learningQuestion.country}
						</p>
					</div>

					{/* Answer Options */}
					<div className="space-y-3">
						{learningQuestion.options.map((option) => (
							<button
								key={option}
								onClick={() => handleAnswerSelect(option)}
								disabled={!!learningFeedback}
								className={getButtonClass(option)}
							>
								{option}
							</button>
						))}
					</div>

					{/* Feedback Panel */}
					{learningFeedback && (
						<div
							className={`p-6 rounded-lg ${
								learningFeedback.isCorrect
									? 'bg-green-50 border-2 border-green-500'
									: 'bg-red-50 border-2 border-red-500'
							}`}
						>
							<div className="flex items-start gap-3">
								<div className="text-3xl">
									{learningFeedback.isCorrect ? '✅' : '❌'}
								</div>
								<div className="flex-1">
									<p
										className={`font-bold text-lg ${
											learningFeedback.isCorrect ? 'text-green-800' : 'text-red-800'
										}`}
									>
										{learningFeedback.isCorrect ? 'Correct!' : 'Incorrect'}
									</p>
									<p
										className={
											learningFeedback.isCorrect ? 'text-green-700' : 'text-red-700'
										}
									>
										{learningFeedback.explanation}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex gap-4">
						{!learningFeedback ? (
							<button
								onClick={handleSubmit}
								disabled={!selectedAnswer || isLoading}
								className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
							>
								{isLoading ? 'Submitting...' : 'Submit Answer'}
							</button>
						) : (
							<button
								onClick={handleNextQuestion}
								disabled={isLoading}
								className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
							>
								{isLoading ? 'Loading...' : 'Next Question →'}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
