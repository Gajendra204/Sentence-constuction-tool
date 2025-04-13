/**
 * Represents a single question in the quiz
 * @interface Question
 */
export interface Question {
    /** Unique identifier for the question */
    questionId: string;
    /** The question text containing blanks marked with underscores */
    question: string;
    /** Type of question (e.g., 'text') */
    questionType: string;
    /** Type of answer format (e.g., 'options') */
    answerType: string;
    /** Array of word options available for filling blanks */
    options: string[];
    /** Array of words in correct order for the answer */
    correctAnswer: string[];
}

/**
 * Complete quiz data structure including questions and metadata
 * @interface QuizData
 */
export interface QuizData {
    /** API response status */
    status: string;
    /** Main quiz data container */
    data: {
        /** Unique identifier for the test session */
        testId: string;
        /** Array of questions for the quiz */
        questions: Question[];
    };
    /** Response message from the API */
    message: string;
    /** Activity tracking metadata */
    activity: {
        /** Unique activity identifier */
        id: string;
        /** User identifier */
        userId: string;
        /** Type of activity */
        type: string;
        /** Type of coin transaction */
        coinType: string;
        /** Number of coins involved */
        coins: number;
        /** Description of the activity */
        description: string;
        /** Timestamp of activity */
        createdAt: string;
    };
}