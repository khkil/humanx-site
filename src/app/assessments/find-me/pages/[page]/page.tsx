'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { User, UserAnswer } from '@/types/user';
import useAssessmentStore from '@/store/assessment';
import useUserAnswerStore from '@/store/userAnswer';
import ProgressBar from '@/components/ui/ProgressBar';
import { fetchAssessmentPagesQuestions } from '@/service/assessment';
import { AssessmentPagesQuestion } from '@/types/assessment';
import FindMeLoading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/InvalidMessage';
import useUserStore from '@/store/user';

export default function QuestionPage() {
  const { page } = useParams<{ page: string }>();
  const router = useRouter();

  const { state: assessment } = useAssessmentStore();
  const { state: user } = useUserStore();
  const { state: userAnswers, addState, removeState } = useUserAnswerStore();

  const { data, isLoading } = useSWR<AssessmentPagesQuestion[], Error>(
    `assessmentQuestions_${page}`,
    () => fetchAssessmentPagesQuestions(1, parseInt(page)),
    {
      revalidateOnFocus: false,
    }
  );

  const isLastPage: boolean = useMemo(() => assessment?.totalPage === parseInt(page), [assessment, page]);
  const percentage: number = useMemo(() => (!assessment?.totalPage ? 0 : (100 / assessment?.totalPage) * parseInt(page)), [assessment, page]);

  const [errors, setErrors] = useState<Map<string, boolean>>(new Map<string, boolean>());

  const onChange = (answer: UserAnswer) => {
    const index = userAnswers.findIndex(({ questionId }) => questionId == answer.questionId);
    const hasAnswer = index > -1;

    errors.set(`question_${answer.questionId}`, false);
    setErrors(errors);

    if (hasAnswer) {
      removeState(answer.questionId);
    }
    addState(answer);
  };

  const handleSubmit = () => {
    if (!checkValidate()) {
      return;
    }
    if (!isLastPage) {
      router.replace(`/assessments/find-me/pages/${parseInt(page) + 1}`);
    } else {
      const params = {
        ...user,
        userAnswers,
      };

      console.log(JSON.stringify(params));
    }
  };

  const checkValidate = () => {
    if (data) {
      const errors: Map<string, boolean> = data.reduce((error, { questionId }) => {
        const hasError = userAnswers.findIndex((state) => state.questionId == questionId) === -1;
        error.set(`question_${questionId}`, hasError);
        return error;
      }, new Map<string, boolean>());
      setErrors(errors);

      return Array.from(errors.values()).filter((error) => error).length === 0;
    }
    return true;
  };

  useEffect(() => {
    if (data) {
      data.forEach(({ questionId }) => {
        removeState(questionId);
      });
    }
  }, [data]);

  return (
    <Fragment>
      <div className='findme__question__explanation'>
        평소의 <b>나와 가장 가까울 수록 6점에 가깝게,</b>
        <br />
        평소의 <b>나와 같지 않을 수록 1점에 가깝게</b> 체크하세요.
      </div>

      <div className='findme__question__wrapper'>
        {isLoading ? (
          <div className={'h-64'}>
            <FindMeLoading />
          </div>
        ) : (
          <div>
            <div className='findme__common__toolbar'>
              <div className='w-full bg-gray-200 rounded-full h-2.5'>
                <ProgressBar percentage={percentage} />
              </div>
            </div>
            <div className='findme__question__element'>
              {data?.map(({ questionId, questionTitle, answers }) => (
                <div key={questionId} className='findme__question__element__label mb-10'>
                  {questionTitle}
                  <div className='findme__question__element__options'>
                    {answers.map(({ answerId, answerTitle }, index) => (
                      <div key={answerId} className='findme__question__element__option'>
                        <label className='findme__question__element__option' htmlFor={`answer_${answerId}`}>
                          <input
                            type='radio'
                            id={`answer_${answerId}`}
                            name={`question_${questionId}`}
                            value={answerId}
                            onChange={() => {
                              onChange({ questionId, answerId });
                            }}
                            required
                          />
                          <div className='findme__question__element__option-Checker'></div>
                          {answerTitle}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.get(`question_${questionId}`) && <ErrorMessage text={'문항을 체크해주세요.'} />}
                </div>
              ))}
            </div>
          </div>
        )}
        {JSON.stringify(userAnswers)}
        {JSON.stringify(user)}
      </div>
      <div className='findme__common__next'>
        <button type='submit' className='findme__common__next__button' onClick={handleSubmit}>
          NEXT
          <img className='findme__common__next__button--image' src={'/images/find-me/icons/next.svg'} alt='next' />
        </button>
      </div>
    </Fragment>
  );
}
