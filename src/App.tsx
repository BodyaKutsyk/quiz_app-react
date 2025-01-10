import './App.scss';

import { useEffect, useState } from 'react';
import { Quiz } from './components/Quiz';
import { fetchQuestions } from './utils/fetchQuestions';
import { Question } from './types/Question';

export const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchQuestions()
      .then(questionsData => {
        if ('Error' in questionsData) {
          setError(`Can't find the questions!`);

          return;
        }

        setQuestions(questionsData);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      });
  }, []);

  return <>{!error && <Quiz isLoading={isLoading} questions={questions} />}</>;
};
