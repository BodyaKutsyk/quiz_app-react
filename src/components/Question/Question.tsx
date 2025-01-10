import classNames from 'classnames';
import { Answer } from '../../types/Answer';
import { CheckedQuestion } from '../../types/CheckedQuestions';
import './Question.scss';

type Props = {
  answer: Answer;
  checkedQuestions: CheckedQuestion[];
  setCheckedQuestions: (questions: CheckedQuestion[]) => void;
  currentQuestionId: number;
  currentAnswerId: number;
};

export const Question: React.FC<Props> = ({
  answer,
  checkedQuestions,
  setCheckedQuestions,
  currentAnswerId,
  currentQuestionId,
}) => {
  const isAnswered = checkedQuestions.find(
    question => question.questionId === currentQuestionId,
  );

  const handleAnswer = () => {
    if (!isAnswered) {
      setCheckedQuestions([
        ...checkedQuestions,
        {
          isCorrect: answer.isCorrect,
          answerId: currentAnswerId,
          questionId: currentQuestionId,
        },
      ]);
    }
  };

  const answeredState =
    isAnswered?.answerId === currentAnswerId &&
    isAnswered.questionId === currentQuestionId;

  return (
    <div
      className={classNames('question', {
        'question--correct': answeredState && isAnswered.isCorrect,
        'question--wrong': answeredState && !isAnswered.isCorrect,
      })}
      onClick={handleAnswer}
    >
      <p>{answer.text}</p>
    </div>
  );
};
