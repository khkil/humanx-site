'use client';

import { Fragment, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { UserAnswer } from '@/types/user';
import useAssessmentStore from '@/store/assessment';
import useUserAnswerStore from '@/store/user';
import ProgressBar from '@/components/ui/ProgressBar';
import FindMeLoading from '@/components/find-me/Loading';
import { fetchAssessmentPagesQuestions, fetchAssessmentUserCount } from '@/service/assessment';
import { AssessmentPagesQuestion } from '@/types/assessment';

export default function QuestionPage() {
  const { page } = useParams<{ page: string }>();
  const router = useRouter();

  const { state } = useAssessmentStore();
  const { state: userAnswerState, addState, removeState } = useUserAnswerStore();

  const isLastPage: boolean = useMemo(() => state?.totalPage === parseInt(page), [state, page]);
  const percentage: number = useMemo(() => (!state?.totalPage ? 0 : (100 / state?.totalPage) * parseInt(page)), [state, page]);

  const { data, isLoading } = useSWR<AssessmentPagesQuestion[], Error>(
    'assessmentQuestions',
    () => fetchAssessmentPagesQuestions(1, parseInt(page)),
    {
      revalidateOnFocus: false,
    }
  );

  const goNextPage = () => {
    if (!isLastPage) {
      router.replace(`/assessments/find-me/pages/${parseInt(page) + 1}`);
    }
  };

  const onChange = (answer: UserAnswer) => {
    const index = userAnswerState.findIndex(({ questionId }) => questionId == answer.questionId);
    const hasAnswer = index > -1;

    if (hasAnswer) {
      removeState(index);
    }
    addState(answer);
  };

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
                  <p className='font-bold text-sm text-red-500 '>
                    <span className='font-medium'>문항을 체크해주세요.</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {JSON.stringify(userAnswerState)}
      </div>
      <div className='findme__common__next'>
        <button type='submit' className='findme__common__next__button' onClick={goNextPage}>
          NEXT
          <img className='findme__common__next__button--image' src={'/images/find-me/icons/next.svg'} alt='next' />
        </button>
      </div>
    </Fragment>
  );
}
