import { QuizData } from "../types";

/**
 * Props interface for the Results component
 * @interface ResultsProps
 */
interface ResultsProps {
  /** Complete quiz data including questions and correct answers */
  quizData: QuizData;
  /** Array of user's answers for each question */
  userAnswers: string[][];
  /** Callback function to restart the quiz */
  onRestart: () => void;
}

/**
 * Results Component
 * Displays the final results of the quiz including:
 * - Overall score and percentage
 * - Detailed breakdown of each question
 * - Comparison between user answers and correct answers
 * - Option to restart the quiz
 */
const Results = ({ quizData, userAnswers, onRestart }: ResultsProps) => {
  /**
   * Calculate the total score based on correct answers
   * @returns {number} Number of correct answers
   */
  const score = quizData.data.questions.reduce((total, question, index) => {
    if (!userAnswers[index]) return total;
    const isCorrect =
      JSON.stringify(userAnswers[index]) ===
      JSON.stringify(question.correctAnswer);
    return isCorrect ? total + 1 : total;
  }, 0);

  // Calculate percentage score for display
  const totalQuestions = quizData.data.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  /**
   * Process results data for display
   * Combines question data with user answers and calculates correctness
   */
  const results = quizData.data.questions.map((question, index) => {
    const userAnswer = userAnswers[index] || [];
    const isCorrect =
      JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
    return {
      questionId: question.questionId,
      questionText: question.question,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
    };
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Quiz Results</h1>

      {/* Overall Score Display */}
      <div className="mb-8 text-center p-6 bg-gray-50 rounded-lg">
        <div className="text-6xl font-bold mb-2 text-blue-600">
          {percentage}%
        </div>
        <div className="text-xl text-gray-700">
          You got {score} out of {totalQuestions} questions correct
        </div>
        {/* Dynamic feedback based on score */}
        <div className="mt-4 text-gray-600">
          {percentage >= 80
            ? "Excellent work! You've mastered these sentences!"
            : percentage >= 50
            ? "Good effort! Keep practicing to improve further."
            : "Keep practicing! Review your answers below to learn from your mistakes."}
        </div>
      </div>

      {/* Detailed Results Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Detailed Results
        </h2>

        {/* Individual Question Results */}
        {results.map((result, index) => (
          <div
            key={result.questionId}
            className={`mb-6 p-4 border rounded-lg ${
              result.isCorrect
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            {/* Question Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">
                Question {index + 1}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  result.isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {result.isCorrect ? "Correct" : "Incorrect"}
              </span>
            </div>

            {/* Question Text */}
            <div className="mb-3">
              <p className="text-gray-700">{result.questionText}</p>
            </div>

            {/* Answer Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User's Answer */}
              <div>
                <h4 className="font-medium mb-1 text-gray-700">Your Answer:</h4>
                <div className="flex flex-wrap gap-1">
                  {result.userAnswer.map((word, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded ${
                        result.isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Correct Answer (shown only for incorrect responses) */}
              {!result.isCorrect && (
                <div>
                  <h4 className="font-medium mb-1 text-gray-700">
                    Correct Answer:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {result.correctAnswer.map((word, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded bg-blue-100 text-blue-700"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default Results;
