import { SUCCESS_STATUS } from '../constants';
import customFetch from '@/service/index';

export const fetchAssessmentDetail = async (assessmentId: number) => {
  const { status, data, message } = await customFetch({
    url: `/api/v2/assessments/${assessmentId}`,
  });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};

export const fetchAssessmentUserCount = async (assessmentId: number) => {
  const { status, data, message } = await customFetch({
    url: `/api/v2/assessments/${assessmentId}/users/count`,
  });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};

export const fetchAssessmentPagesQuestions = async (assessmentId: number, page: number) => {
  const { status, data, message } = await customFetch({
    url: `/api/v2/assessments/${assessmentId}/questions/pages/${page}`,
  });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};
