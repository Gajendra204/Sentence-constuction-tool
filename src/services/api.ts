import axios from 'axios';
import { QuizData } from '../types';

/** Base URL for the quiz API */
const API_URL = 'http://localhost:3001/data';


export const fetchQuizData = async (): Promise<QuizData> => {
  try {
    // Fetch questions data from the API
    const response = await axios.get(API_URL);
    
    // Construct and validate the quiz data structure
    const quizData: QuizData = {
      status: 'SUCCESS',
      data: {
        testId: response.data.testId,
        questions: response.data.questions || []
      },
      message: 'Questions fetched successfully',
      activity: {
        id: '3c576049-9ea9-4b5c-9fb7-4b316adaaaa0',
        userId: 'c6ad08a5-67ac-4a4d-aa3a-16d7fe91d51c',
        type: 'VERSANT_CATEGORY_TEST',
        coinType: 'DEDUCTED',
        coins: 20,
        description: 'Used Versant Category Test',
        createdAt: '2025-04-10T06:42:21.041Z'
      }
    };

    // Log data structure for debugging
    console.log('Quiz Data Structure:', quizData);
    return quizData;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
}