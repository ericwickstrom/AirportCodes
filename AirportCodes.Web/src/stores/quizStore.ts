import { create } from 'zustand';
import { learningApi, testApi } from '../services/api';
import type {
	LearningQuestion,
	LearningAnswerResponse,
	TestSession,
	TestQuestion,
	TestAnswerResponse,
	TestResult,
} from '../types';

type QuizMode = 'learning' | 'test' | null;

interface QuizState {
	mode: QuizMode;
	isLoading: boolean;
	error: string | null;

	// Learning Mode
	learningQuestion: LearningQuestion | null;
	learningFeedback: LearningAnswerResponse | null;
	customTestId: string | null;

	// Test Mode
	testSession: TestSession | null;
	testQuestion: TestQuestion | null;
	testFeedback: TestAnswerResponse | null;
	testResult: TestResult | null;

	// Actions
	startLearningMode: (customTestId?: string) => Promise<void>;
	submitLearningAnswer: (selectedAnswer: string) => Promise<LearningAnswerResponse | undefined>;
	nextLearningQuestion: () => Promise<void>;

	startTestMode: (totalQuestions?: number, customTestId?: string) => Promise<void>;
	getTestQuestion: () => Promise<void>;
	submitTestAnswer: (selectedAnswer: string) => Promise<void>;
	completeTest: () => Promise<void>;

	resetQuiz: () => void;
	clearError: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
	mode: null,
	isLoading: false,
	error: null,

	learningQuestion: null,
	learningFeedback: null,
	customTestId: null,

	testSession: null,
	testQuestion: null,
	testFeedback: null,
	testResult: null,

	// Learning Mode Actions
	startLearningMode: async (customTestId?: string) => {
		set({
			mode: 'learning',
			isLoading: true,
			error: null,
			learningFeedback: null,
			customTestId: customTestId || null
		});
		try {
			const question = await learningApi.getQuestion(customTestId);
			set({ learningQuestion: question, isLoading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to load question',
				isLoading: false,
			});
			throw error;
		}
	},

	submitLearningAnswer: async (selectedAnswer: string) => {
		const { learningQuestion } = get();
		if (!learningQuestion) return undefined;

		set({ isLoading: true, error: null });
		try {
			const feedback = await learningApi.submitAnswer({
				questionId: learningQuestion.questionId,
				selectedAnswer,
			});
			set({ learningFeedback: feedback, isLoading: false });
			return feedback;
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to submit answer',
				isLoading: false,
			});
			throw error;
		}
	},

	nextLearningQuestion: async () => {
		const { customTestId } = get();
		set({ isLoading: true, error: null, learningFeedback: null });
		try {
			const question = await learningApi.getQuestion(customTestId || undefined);
			set({ learningQuestion: question, isLoading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to load question',
				isLoading: false,
			});
			throw error;
		}
	},

	// Test Mode Actions
	startTestMode: async (totalQuestions = 10, customTestId?: string) => {
		set({
			mode: 'test',
			isLoading: true,
			error: null,
			testFeedback: null,
			testResult: null,
			customTestId: customTestId || null,
		});
		try {
			const session = await testApi.startTest(totalQuestions, customTestId);
			set({ testSession: session, isLoading: false });
			await get().getTestQuestion();
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to start test',
				isLoading: false,
			});
			throw error;
		}
	},

	getTestQuestion: async () => {
		const { testSession } = get();
		if (!testSession) return;

		set({ isLoading: true, error: null, testFeedback: null });
		try {
			const question = await testApi.getQuestion(testSession.sessionId);
			set({ testQuestion: question, isLoading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to load question',
				isLoading: false,
			});
			throw error;
		}
	},

	submitTestAnswer: async (selectedAnswer: string) => {
		const { testSession, testQuestion } = get();
		if (!testSession || !testQuestion) return;

		set({ isLoading: true, error: null });
		try {
			const feedback = await testApi.submitAnswer({
				sessionId: testSession.sessionId,
				questionId: testQuestion.questionId,
				selectedAnswer,
			});
			set({ testFeedback: feedback, isLoading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to submit answer',
				isLoading: false,
			});
			throw error;
		}
	},

	completeTest: async () => {
		const { testSession } = get();
		if (!testSession) return;

		set({ isLoading: true, error: null });
		try {
			const result = await testApi.getResults(testSession.sessionId);
			set({ testResult: result, isLoading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed to get results',
				isLoading: false,
			});
			throw error;
		}
	},

	resetQuiz: () => {
		set({
			mode: null,
			learningQuestion: null,
			learningFeedback: null,
			customTestId: null,
			testSession: null,
			testQuestion: null,
			testFeedback: null,
			testResult: null,
			error: null,
		});
	},

	clearError: () => set({ error: null }),
}));
