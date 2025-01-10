import { Question } from '../types/Question';
import { ResponseError } from '../types/ResponseError';

const API_URL = './api/questions.json';

export function fetchQuestions(): Promise<Question[] | ResponseError> {
  return fetch(API_URL)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
