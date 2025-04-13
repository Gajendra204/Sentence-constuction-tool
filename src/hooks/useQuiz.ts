import { useState, useEffect } from 'react';
import { QuizData } from '../types';
import { fetchQuizData } from '../services/api';

/**
 * Custom hook to manage quiz state and logic
 * Separates quiz business logic from the component presentation
 */
export const useQuiz = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Load quiz data
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

  // Timer management
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

  return {
    quizData,
    currentQuestionIndex,
    timeLeft,
    loading,
    error,
    userAnswers,
    showResults,
    showWelcome,
    currentQuestion: quizData?.data.questions[currentQuestionIndex],
    handleStartTest,
    handleAnswerSubmit,
    handleTimeUp,
    handleRestart
  };
};