import Welcome from "./components/Welcome";
import Question from "./components/Question";
import Results from "./components/Results";
import { useQuiz } from "./hooks/useQuiz";

function App() {
  const {
    loading,
    error,
    quizData,
    showWelcome,
    showResults,
    currentQuestion,
    currentQuestionIndex,
    timeLeft,
    userAnswers,
    handleStartTest,
    handleAnswerSubmit,
    handleTimeUp,
    handleRestart,
  } = useQuiz();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 text-lg">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!quizData?.data?.questions) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 text-lg">
          No questions available. Please check your data source.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {showWelcome && (
        <Welcome
          onStart={handleStartTest}
          totalQuestions={quizData.data.questions.length}
          timePerQuestion={30}
        />
      )}

      {!showWelcome && !showResults && currentQuestion && (
        <Question
          questionData={currentQuestion}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizData.data.questions.length}
          timeLeft={timeLeft}
          onAnswerSubmit={handleAnswerSubmit}
          onTimeUp={handleTimeUp}
        />
      )}

      {showResults && (
        <Results
          quizData={quizData}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
