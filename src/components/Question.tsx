import { useState, useEffect } from "react";
import { Question as QuestionType } from "../types";

/**
 * Props interface for the Question component
 * @interface QuestionProps
 */
interface QuestionProps {
  /** The current question data to be displayed */
  questionData: QuestionType;
  /** The current question number (1-based index) */
  currentQuestion: number;
  /** Total number of questions in the quiz */
  totalQuestions: number;
  /** Time remaining for the current question in seconds */
  timeLeft: number;
  /** Callback function when user submits an answer */
  onAnswerSubmit: (selectedAnswers: string[]) => void;
  /** Callback function when timer reaches zero */
  onTimeUp: () => void;
}

/**
 * Question Component
 * Displays a single question with fill-in-the-blank format where users can
 * select words from available options to complete the sentence.
 * Features include:
 * - Timer countdown
 * - Word selection/unselection mechanism
 * - Dynamic blank spaces that update as words are selected
 * - Next button that enables when all blanks are filled
 */
const Question = ({
  questionData,
  currentQuestion,
  totalQuestions,
  timeLeft,
  onAnswerSubmit,
  onTimeUp,
}: QuestionProps) => {
  // Track selected words for each blank space
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  // Track available words that can be selected
  const [availableWords, setAvailableWords] = useState<string[]>([]);

 
  // Initialize available words and blank spaces when question changes

  useEffect(() => {
    setAvailableWords([...questionData.options]);
    setSelectedWords(Array(questionData.correctAnswer.length).fill(""));
  }, [questionData]);

  
   // Handle timer expiration
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  /**
   * Handles the selection of a word for a specific blank space
   * @param word - The word being selected
   * @param blankIndex - The index of the blank space where the word will be placed
   */
  const handleWordSelect = (word: string, blankIndex: number) => {
    const newSelectedWords = [...selectedWords];

    // If blank already has a word, return it to available words
    if (newSelectedWords[blankIndex]) {
      setAvailableWords([...availableWords, newSelectedWords[blankIndex]]);
    }

    // Assign new word to the blank
    newSelectedWords[blankIndex] = word;
    setSelectedWords(newSelectedWords);

    // Remove selected word from available words
    setAvailableWords(availableWords.filter((w) => w !== word));
  };

  /**
   * Handles removing a word from a blank space
   * @param blankIndex - The index of the blank space to clear
   */
  const handleWordUnselect = (blankIndex: number) => {
    const wordToReturn = selectedWords[blankIndex];
    if (wordToReturn) {
      setAvailableWords([...availableWords, wordToReturn]);
      const newSelectedWords = [...selectedWords];
      newSelectedWords[blankIndex] = "";
      setSelectedWords(newSelectedWords);
    }
  };

  /**
   * Renders the question text with interactive blank spaces
   * @returns JSX element with the formatted question and blank spaces
   */
  const renderQuestionText = () => {
    if (!questionData.question) return null;

    const parts = questionData.question.split("_____________");
    return (
      <div className="text-lg text-gray-800">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && (
              <span
                onClick={() => handleWordUnselect(index)}
                className={`inline-block mx-1 px-2 py-1 border-b-2 min-w-[100px] ${
                  selectedWords[index]
                    ? "border-[rgba(69,63,225,1)] text-[rgba(69,63,225,1)] cursor-pointer"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {selectedWords[index] || "______"}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[975px] h-[650px] bg-white rounded-xl shadow-lg overflow-auto relative">
      {/* Timer Section */}
      <div className="absolute top-4 right-4">
        <span className="text-gray-600">{timeLeft}s</span>
      </div>

      <div className="p-8 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold text-gray-700">
            Question {currentQuestion}/{totalQuestions}
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800">
            Fill in the blanks with the appropriate words
          </h2>

          <div className="bg-white rounded-lg">{renderQuestionText()}</div>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {availableWords.map((word) => (
              <button
                key={word}
                onClick={() => {
                  const firstEmptyIndex = selectedWords.findIndex((w) => !w);
                  if (firstEmptyIndex !== -1) {
                    handleWordSelect(word, firstEmptyIndex);
                  }
                }}
                className="px-4 py-2 text-[rgba(69,63,225,1)] bg-[rgba(69,63,225,0.1)] hover:bg-[rgba(69,63,225,0.15)] rounded-lg transition-colors duration-200"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={() => onAnswerSubmit(selectedWords)}
            disabled={selectedWords.some((word) => !word)}
            style={{ backgroundColor: "rgba(69, 63, 225, 1)" }}
            className="w-full px-6 py-3 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
