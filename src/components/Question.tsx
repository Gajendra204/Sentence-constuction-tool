import { useState, useEffect } from "react";
import { Question as QuestionType } from "../types";

interface QuestionProps {
  questionData: QuestionType;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswerSubmit: (selectedAnswers: string[]) => void;
  onTimeUp: () => void;
}

const Question = ({
  questionData,
  currentQuestion,
  totalQuestions,
  timeLeft,
  onAnswerSubmit,
  onTimeUp,
}: QuestionProps) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Initialize available words and blanks
  useEffect(() => {
    setAvailableWords([...questionData.options]);
    setSelectedWords(Array(questionData.correctAnswer.length).fill(""));
  }, [questionData]);

  // Handle timer
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

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

  const handleWordUnselect = (blankIndex: number) => {
    const wordToReturn = selectedWords[blankIndex];
    if (wordToReturn) {
      setAvailableWords([...availableWords, wordToReturn]);
      const newSelectedWords = [...selectedWords];
      newSelectedWords[blankIndex] = "";
      setSelectedWords(newSelectedWords);
    }
  };

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
                    ? "border-blue-500 text-blue-600 cursor-pointer"
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">Time: {timeLeft}s</div>
        <div className="text-lg font-semibold">
          Question {currentQuestion}/{totalQuestions}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Fill in the blanks with the appropriate words
        </h2>
        <div className="mb-6">{renderQuestionText()}</div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {availableWords.map((word) => (
            <button
              key={word}
              onClick={() => {
                const firstEmptyIndex = selectedWords.findIndex((w) => !w);
                if (firstEmptyIndex !== -1) {
                  handleWordSelect(word, firstEmptyIndex);
                }
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onAnswerSubmit(selectedWords)}
        disabled={selectedWords.some((word) => !word)}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Question;
