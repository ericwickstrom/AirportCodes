import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuizStore } from '../stores/quizStore';
import { customTestApi } from '../services/api';
import QuizLayout from '../components/quiz/QuizLayout';
import QuestionDisplay from '../components/quiz/QuestionDisplay';
import FeedbackPanel from '../components/quiz/FeedbackPanel';
import QuizButton from '../components/quiz/QuizButton';
import LoadingState from '../components/quiz/LoadingState';
import ErrorState from '../components/quiz/ErrorState';
import ScoreDisplay from '../components/quiz/ScoreDisplay';

export default function TestMode() {
	const { customTestId } = useParams<{ customTestId?: string }>();
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

	// Fetch custom test details if customTestId is present
	useEffect(() => {
		const fetchCustomTest = async () => {
			if (customTestId) {
				try {
					// Get the test from public tests or user tests
					const publicTests = await customTestApi.getPublicTests();
					const test = publicTests.find((t) => t.id === customTestId);
					if (test) {
						// Set default question count to airport count
						setSelectedQuestionCount(test.airportCount);
					}
				} catch (err) {
					console.error('Failed to load custom test:', err);
				}
			}
		};
		fetchCustomTest();
	}, [customTestId]);

	// Start screen
	const handleStartTest = async () => {
		await startTestMode(selectedQuestionCount, customTestId);
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
		return <ErrorState title="Test Mode" error={error} onRetry={handleNewTest} />;
	}

	// Loading state (initial)
	if (isLoading && !testSession && !testResult) {
		return <LoadingState />;
	}

	// Completion screen
	if (testResult) {
		return (
			<QuizLayout title="Test Complete!">
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
						<QuizButton onClick={handleNewTest}>Start New Test</QuizButton>
						<QuizButton variant="secondary">
							<a href="/" className="block">
								Back to Home
							</a>
						</QuizButton>
					</div>
				</div>
			</QuizLayout>
		);
	}

	// Question screen
	if (testSession && testQuestion) {
		return (
			<QuizLayout
				title="Test Mode"
				headerRight={
					<ScoreDisplay
						label="Progress"
						correct={testQuestion.questionNumber}
						total={testQuestion.totalQuestions}
					/>
				}
			>
				{/* Question Card */}
				<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
					{/* Airport Information */}
					<QuestionDisplay
						airportName={testQuestion.airportName}
						city={testQuestion.city}
						country={testQuestion.country}
					/>

					{/* Answer Input */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">Enter 3-letter IATA code:</label>
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
						<p className="text-xs text-gray-500 text-center">{answer.length}/3 letters</p>
					</div>

					{/* Feedback Panel */}
					{testFeedback && (
						<FeedbackPanel
							isCorrect={testFeedback.isCorrect}
							correctAnswer={testFeedback.correctAnswer}
						/>
					)}

					{/* Action Buttons */}
					<div className="flex gap-4">
						{!testFeedback ? (
							<QuizButton onClick={handleSubmit} disabled={answer.length !== 3 || isLoading}>
								{isLoading ? 'Submitting...' : 'Submit Answer'}
							</QuizButton>
						) : (
							<QuizButton onClick={handleNextQuestion} disabled={isLoading}>
								{isLoading
									? 'Loading...'
									: testQuestion.questionNumber >= testQuestion.totalQuestions
									? 'View Results →'
									: 'Next Question →'}
							</QuizButton>
						)}
					</div>
				</div>
			</QuizLayout>
		);
	}

	// Start screen (default)
	return (
		<QuizLayout title="Test Mode">
			<div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold text-gray-900">Ready to test your knowledge?</h2>
					<p className="text-gray-600">
						Type the correct IATA code for each airport. Get immediate feedback and see your final
						score!
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
		</QuizLayout>
	);
}
