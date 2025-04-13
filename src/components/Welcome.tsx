interface WelcomeProps {
    onStart: () => void;
    totalQuestions: number;
    timePerQuestion: number;
  }
  
  const Welcome = ({ onStart, totalQuestions, timePerQuestion }: WelcomeProps) => {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Sentence Construction</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Select the correct words to complete the sentence by arranging
            <br />
            the provided options in the right order.
          </h2>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-600 mb-2">Time Per Question</h3>
            <p className="text-2xl font-bold text-blue-600">{timePerQuestion} sec</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-600 mb-2">Total Questions</h3>
            <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onStart}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  };
  
  export default Welcome;