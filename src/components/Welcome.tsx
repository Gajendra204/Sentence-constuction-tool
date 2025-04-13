/**
 * Props interface for the Welcome component
 * @interface WelcomeProps
 */
interface WelcomeProps {
  /** Callback function to start the quiz */
  onStart: () => void;
  /** Total number of questions in the quiz */
  totalQuestions: number;
  /** Time allocated for each question in seconds */
  timePerQuestion: number;
}

const Welcome = ({
  onStart,
  totalQuestions,
  timePerQuestion,
}: WelcomeProps) => {
  return (
    <div className="w-full max-w-[627px] h-[472px] p-6 bg-white rounded-lg shadow-md text-center">
      {/* Title Section */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Sentence Construction
      </h1>

      {/* Instructions Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Select the correct words to complete the sentence by arranging
          <br />
          the provided options in the right order.
        </h2>
      </div>

      {/* Quiz Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Time Per Question Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-600 mb-2">Time Per Question</h3>
          <p
            className="text-2xl font-bold text-blue-600"
            style={{ color: "rgba(69, 63, 225, 1)" }}
          >
            {timePerQuestion} sec
          </p>
        </div>
        {/* Total Questions Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-600 mb-2">Total Questions</h3>
          <p
            className="text-2xl font-bold "
            style={{ color: "rgba(69, 63, 225, 1)" }}
          >
            {totalQuestions}
          </p>
        </div>
      </div>

      {/* Start Button Section */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onStart}
          className="px-8 py-3 text-white rounded-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: "rgba(69, 63, 225, 1)" }}
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default Welcome;
