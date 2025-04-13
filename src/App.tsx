import { useState, useEffect } from "react";
import { fetchQuizData } from "./services/api";
import Welcome from "./components/Welcome";
import Question from "./components/Question";
import Results from "./components/Results";
import { QuizData } from "./types";

function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchQuizData();
        if (data?.data?.questions?.length > 0) {
          setQuizData(data);
          setUserAnswers(Array(data.data.questions.length).fill([]));
        } else {
          setError("No questions found in the data");
        }
      } catch (err) {
        setError("Failed to load questions. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!quizData?.data?.questions || showResults || showWelcome) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, quizData, showResults, showWelcome]);

  const handleStartTest = () => {
    setShowWelcome(false);
  };

  const handleAnswerSubmit = (selectedAnswers: string[]) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswers;
    setUserAnswers(newUserAnswers);
    moveToNextQuestion();
  };

  const handleTimeUp = () => {
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (quizData && currentQuestionIndex < quizData.data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setUserAnswers(Array(quizData?.data.questions.length || 0).fill([]));
    setShowResults(false);
    setShowWelcome(true);
  };

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

  if (!quizData || !quizData.data?.questions) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 text-lg">
          No questions available. Please check your data source.
        </div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
        <Welcome
          onStart={handleStartTest}
          totalQuestions={quizData.data.questions.length}
          timePerQuestion={30}
        />
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
        <Results
          quizData={quizData}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  const currentQuestion = quizData.data.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 text-lg">
          Error: Current question not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Question
        questionData={currentQuestion}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData.data.questions.length}
        timeLeft={timeLeft}
        onAnswerSubmit={handleAnswerSubmit}
        onTimeUp={handleTimeUp}
      />
    </div>
  );
}

export default App;