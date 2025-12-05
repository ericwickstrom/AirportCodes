import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuizStore } from '../stores/quizStore';
import QuizLayout from '../components/quiz/QuizLayout';
import QuestionDisplay from '../components/quiz/QuestionDisplay';
import FeedbackPanel from '../components/quiz/FeedbackPanel';
import QuizButton from '../components/quiz/QuizButton';
import LoadingState from '../components/quiz/LoadingState';
import ErrorState from '../components/quiz/ErrorState';
import ScoreDisplay from '../components/quiz/ScoreDisplay';

export default function LearningMode() {
	const { customTestId } = useParams<{ customTestId?: string }>();
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
		startLearningMode(customTestId);
	}, [startLearningMode, customTestId]);

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

	const getButtonClass = (option: string) => {
		const baseClass = 'w-full p-4 text-left rounded-lg font-semibold transition-all';

		if (!learningFeedback) {
			// Before submission
			if (selectedAnswer === option) {
				return `${baseClass} bg-indigo-600 dark:bg-indigo-500 text-white`;
			}
			return `${baseClass} bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-600`;
		} else {
			// After submission - show feedback
			if (option === learningFeedback.correctAnswer) {
				return `${baseClass} bg-green-500 text-white`;
			}
			if (selectedAnswer === option && !learningFeedback.isCorrect) {
				return `${baseClass} bg-red-500 text-white`;
			}
			return `${baseClass} bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400`;
		}
	};

	if (error) {
		return <ErrorState title="Learning Mode" error={error} />;
	}

	if (isLoading && !learningQuestion) {
		return <LoadingState message="Loading question..." />;
	}

	if (!learningQuestion) {
		return null;
	}

	// Determine total for score display: use totalQuestions from API for custom tests, otherwise use questionsAnswered
	const scoreTotal = learningQuestion.totalQuestions ?? questionsAnswered;

	return (
		<QuizLayout
			title="Learning Mode"
			subtitle={learningQuestion.customTestName}
			headerRight={<ScoreDisplay label="Score" correct={correctAnswers} total={scoreTotal} />}
		>
			{/* Question Card */}
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
				{/* Airport Information */}
				<QuestionDisplay
					airportName={learningQuestion.airportName}
					city={learningQuestion.city}
					country={learningQuestion.country}
				/>

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
					<FeedbackPanel
						isCorrect={learningFeedback.isCorrect}
						correctAnswer={learningFeedback.correctAnswer}
						explanation={learningFeedback.explanation}
					/>
				)}

				{/* Action Buttons */}
				<div className="flex gap-4">
					{!learningFeedback ? (
						<QuizButton onClick={handleSubmit} disabled={!selectedAnswer || isLoading}>
							{isLoading ? 'Submitting...' : 'Submit Answer'}
						</QuizButton>
					) : (
						<QuizButton onClick={handleNextQuestion} disabled={isLoading}>
							{isLoading ? 'Loading...' : 'Next Question →'}
						</QuizButton>
					)}
				</div>
			</div>
		</QuizLayout>
	);
}
