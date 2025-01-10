import './Quiz.scss';
import { Question as QuestionType } from '../../types/Question';
import { Puff } from 'react-loader-spinner';
import { Question } from '../Question';
import { useState } from 'react';
import cn from 'classnames';
import { CheckedQuestion } from '../../types/CheckedQuestions';

type Props = {
  isLoading: boolean;
  questions: QuestionType[];
};

export const Quiz: React.FC<Props> = ({ isLoading, questions }) => {
  const [index, setIndex] = useState(0);
  const currentQuestion = questions[index];

  const [checkedQuestions, setCheckedQuestions] = useState<CheckedQuestion[]>(
    [],
  );

  const handleChangeIndex = (newIndex: number) => {
    if (newIndex < questions.length) {
      setIndex(newIndex);
    }
  };

  return (
    <div className="quiz">
      {isLoading || !questions.length ? (
        <Puff />
      ) : (
        <>
          {checkedQuestions.length === questions.length ? (
            <>
              <h1>
                Complited with{' '}
                {checkedQuestions.filter(question => question.isCorrect).length}
                /{checkedQuestions.length}
              </h1>
            </>
          ) : (
            <>
              <div className="quiz__wrapper">
                <div className="quiz__header">
                  <h2>
                    Question {index + 1} of {questions.length}
                  </h2>
                </div>
                <div className="quiz__body">
                  <h1 className="quiz__title">{currentQuestion.question}</h1>
                  <div className="quiz__questions">
                    {questions[index].answers.map((answer, i) => (
                      <Question
                        key={answer.text + i}
                        answer={answer}
                        setCheckedQuestions={setCheckedQuestions}
                        checkedQuestions={checkedQuestions}
                        currentAnswerId={i}
                        currentQuestionId={index}
                      />
                    ))}
                  </div>
                  <button
                    className="quiz__btn"
                    onClick={() => handleChangeIndex(index + 1)}
                  >
                    Next
                  </button>
                  <div className="quiz__statuses">
                    {questions.map((_, i) => {
                      const isRight = checkedQuestions.find(
                        question =>
                          question.questionId === i && question.isCorrect,
                      );
                      const isFailed = checkedQuestions.find(
                        question =>
                          question.questionId === i && !question.isCorrect,
                      );

                      return (
                        <button
                          className={cn('quiz__status', {
                            'quiz__status--curent': i === index,
                            'quiz__status--completed': isRight,
                            'quiz__status--failed': isFailed,
                          })}
                          key={i + 'btn'}
                          disabled={i === index}
                          onClick={() => handleChangeIndex(i)}
                        >
                          {isRight && '✓'} {isFailed && '✕'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
