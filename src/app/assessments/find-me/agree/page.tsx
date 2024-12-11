'use client';

import useSWR from 'swr';
import { fetchTermsList } from '@/service/terms';
import { Terms } from '@/types/terms';

import '../../../../css/find-me/information.css';
import '../../../../css/find-me/terms.css';
import { Fragment, useState } from 'react';
import AgreeNotice from '@/components/find-me/agree/AgreeNotice';
import { useRouter } from 'next/navigation';
import TermsList from '@/components/find-me/agree/TermsList';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InvalidMessage from '@/components/ui/InvalidMessage';
import { User } from '@/types/user';
import useUserStore from '@/store/user';
import FindMeLoading from '@/components/ui/Loading';

const formData: { title: string; type: string; name: string }[] = [
  {
    title: '이름',
    type: 'text',
    name: 'userName',
  },
  {
    title: '생년월일',
    type: 'text',
    name: 'userBirth',
  },
  {
    title: '이메일',
    type: 'text',
    name: 'userEmail',
  },
  {
    title: '휴대폰',
    type: 'text',
    name: 'userPhone',
  },
];

export default function PrivacyTermsAgreePage() {
  const { data, isLoading } = useSWR<Terms[], Error>(`terms`, () => fetchTermsList(), {
    revalidateOnFocus: false,
  });

  const { state, setState } = useUserStore();

  const initialValues: User = { userName: '', userBirth: '', userEmail: '', userPhone: '' };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('이름을 입력해주세요.'),
    userBirth: Yup.string().required('생년월일을 입력해주세요.'),
    userEmail: Yup.string().email('이메일 입력 형식이 올바르지 않습니다. 확인 후, 다시 입력하세요.').required('이메일을 입력해주세요.'),
    userPhone: Yup.string().required('휴대폰을 입력해주세요.'),
  });

  const router = useRouter();

  const [agreed, setAgreed] = useState<boolean>(false);

  const onClickAgree = () => {
    router.push('/assessments/find-me/pages/1');
  };

  if (isLoading || !data) return <FindMeLoading />;

  return (
    <Fragment>
      {!agreed ? (
        <AgreeNotice
          onClick={() => {
            setAgreed(true);
          }}
        />
      ) : (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              setState(values);
              onClickAgree();
            }}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, errors }) => (
              <Form>
                <TermsList termsList={data} onChange={() => {}} />
                {formData.map(({ type, title, name }, index) => (
                  <div key={index}>
                    <div className='findme__info__select__label'>{title}</div>
                    <div className='findme__info__select__option'>
                      <label className='findme__info__select__option__element' htmlFor='o1_m' style={{ width: '100%', maxWidth: '100%' }}>
                        <div className='findme__info__select__option__button big' style={{ height: 50 }}>
                          <Field
                            type={type}
                            style={{ display: 'block', width: '100%', height: '50%', border: 'none', outline: 'none', fontSize: 15, padding: 20 }}
                            name={name}
                            onChange={handleChange}
                          />
                        </div>
                        <ErrorMessage name={name} render={(text) => <InvalidMessage text={text} />} />
                      </label>
                    </div>
                  </div>
                ))}
                {JSON.stringify(values)}
                <br />
                {JSON.stringify(errors)}
                <br />
                {JSON.stringify(state)}
                <div className='findme__common__next'>
                  <button type='submit' className='findme__common__next__button'>
                    NEXT
                    <img className='findme__common__next__button--image' src={'/images/find-me/icons/next.svg'} alt='next' />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Fragment>
  );
}
