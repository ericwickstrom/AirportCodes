import { useState } from 'react';
import { useQuizStore } from '../stores/quizStore';

export default function TestMode() {
	const {
		testSession,
		testQuestion,
		testFeedback,
		testResult,
		isLoading,
		error,
		startTestMode,
		getTestQuestion,
		submitTestAnswer,
		completeTest,
		resetQuiz,
	} = useQuizStore();

	const [answer, setAnswer] = useState('');
	const [selectedQuestionCount, setSelectedQuestionCount] = useState(10);

	// Start screen
	const handleStartTest = async () => {
		await startTestMode(selectedQuestionCount);
	};

	// Question screen
	const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toUpperCase().slice(0, 3);
		setAnswer(value);
	};

	const handleSubmit = async () => {
		if (answer.length === 3) {
			await submitTestAnswer(answer);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && answer.length === 3 && !testFeedback) {
			handleSubmit();
		}
	};

	const handleNextQuestion = async () => {
		setAnswer('');

		// Check if test is complete
		if (testQuestion && testQuestion.questionNumber >= testQuestion.totalQuestions) {
			await completeTest();
		} else {
			await getTestQuestion();
		}
	};

	// Completion screen
	const handleNewTest = () => {
		resetQuiz();
		setAnswer('');
	};

	// Error state
	if (error) {
		return (
			<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full">
				<div className="max-w-4xl mx-auto space-y-6">
					<h1 className="text-4xl font-bold text-gray-900">Test Mode</h1>
					<div className="bg-red-50 border-2 border-red-200 rounded-2xl shadow-xl p-8">
						<p className="text-red-700 font-semibold">Error: {error}</p>
						<button
							onClick={handleNewTest}
							className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
						>
							Try Again
						</button>
					</div>
				</div>
			</div>
		);
	}

	// Loading state (initial)
	if (isLoading && !testSession && !testResult) {
		return (
			<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
					<p className="mt-4 text-gray-700 font-semibold">Loading...</p>
				</div>
			</div>
		);
	}

	// Completion screen
	if (testResult) {
		return (
			<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full">
				<div className="max-w-4xl mx-auto space-y-6">
					<h1 className="text-4xl font-bold text-gray-900">Test Complete!</h1>

					<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
						{/* Score Display */}
						<div className="text-center space-y-4">
							<div className="text-8xl font-bold text-indigo-600">
								{testResult.scorePercentage.toFixed(0)}%
							</div>
							<p className="text-xl text-gray-600">Final Score</p>
						</div>

						{/* Breakdown */}
						<div className="grid grid-cols-3 gap-4 pt-6 border-t">
							<div className="text-center">
								<p className="text-3xl font-bold text-gray-900">{testResult.totalQuestions}</p>
								<p className="text-sm text-gray-600">Total Questions</p>
							</div>
							<div className="text-center">
								<p className="text-3xl font-bold text-green-600">{testResult.correctAnswers}</p>
								<p className="text-sm text-gray-600">Correct</p>
							</div>
							<div className="text-center">
								<p className="text-3xl font-bold text-red-600">{testResult.incorrectAnswers}</p>
								<p className="text-sm text-gray-600">Incorrect</p>
							</div>
						</div>

						{/* Actions */}
						<div className="flex gap-4 pt-6">
							<button
								onClick={handleNewTest}
								className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg"
							>
								Start New Test
							</button>
							<a
								href="/"
								className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg text-center"
							>
								Back to Home
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Question screen
	if (testSession && testQuestion) {
		return (
			<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full">
				<div className="max-w-4xl mx-auto space-y-6">
					{/* Header with progress */}
					<div className="flex items-center justify-between">
						<h1 className="text-4xl font-bold text-gray-900">Test Mode</h1>
						<div className="text-right">
							<p className="text-sm text-gray-600">Progress</p>
							<p className="text-2xl font-bold text-indigo-600">
								{testQuestion.questionNumber}/{testQuestion.totalQuestions}
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
								{testQuestion.airportName}
							</h2>
							<p className="text-lg text-gray-600">
								{testQuestion.city}, {testQuestion.country}
							</p>
						</div>

						{/* Answer Input */}
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700">
								Enter 3-letter IATA code:
							</label>
							<input
								type="text"
								value={answer}
								onChange={handleAnswerChange}
								onKeyPress={handleKeyPress}
								disabled={!!testFeedback}
								placeholder="ABC"
								className="w-full px-4 py-3 text-2xl font-bold text-center uppercase border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
								maxLength={3}
								autoFocus
							/>
							<p className="text-xs text-gray-500 text-center">
								{answer.length}/3 letters
							</p>
						</div>

						{/* Feedback Panel */}
						{testFeedback && (
							<div
								className={`p-6 rounded-lg ${
									testFeedback.isCorrect
										? 'bg-green-50 border-2 border-green-500'
										: 'bg-red-50 border-2 border-red-500'
								}`}
							>
								<div className="flex items-start gap-3">
									<div className="text-3xl">
										{testFeedback.isCorrect ? '✅' : '❌'}
									</div>
									<div className="flex-1">
										<p
											className={`font-bold text-lg ${
												testFeedback.isCorrect ? 'text-green-800' : 'text-red-800'
											}`}
										>
											{testFeedback.isCorrect ? 'Correct!' : 'Incorrect'}
										</p>
										{!testFeedback.isCorrect && (
											<p className="text-red-700">
												The correct answer is <strong>{testFeedback.correctAnswer}</strong>
											</p>
										)}
									</div>
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex gap-4">
							{!testFeedback ? (
								<button
									onClick={handleSubmit}
									disabled={answer.length !== 3 || isLoading}
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
									{isLoading
										? 'Loading...'
										: testQuestion.questionNumber >= testQuestion.totalQuestions
										? 'View Results →'
										: 'Next Question →'}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Start screen (default)
	return (
		<div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 min-h-full">
			<div className="max-w-4xl mx-auto space-y-6">
				<h1 className="text-4xl font-bold text-gray-900">Test Mode</h1>

				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					<div className="space-y-2">
						<h2 className="text-2xl font-bold text-gray-900">Ready to test your knowledge?</h2>
						<p className="text-gray-600">
							Type the correct IATA code for each airport. Get immediate feedback and see your final score!
						</p>
					</div>

					{/* Question Count Selection */}
					<div className="space-y-3">
						<p className="font-medium text-gray-700">How many questions?</p>
						<div className="grid grid-cols-3 gap-4">
							{[10, 20, 50].map((count) => (
								<button
									key={count}
									onClick={() => setSelectedQuestionCount(count)}
									className={`py-4 px-6 rounded-lg font-semibold transition-all ${
										selectedQuestionCount === count
											? 'bg-indigo-600 text-white'
											: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
									}`}
								>
									{count}
								</button>
							))}
						</div>
					</div>

					{/* Start Button */}
					<button
						onClick={handleStartTest}
						disabled={isLoading}
						className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
					>
						{isLoading ? 'Starting Test...' : 'Start Test'}
					</button>
				</div>
			</div>
		</div>
	);
}
