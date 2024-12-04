import { SUCCESS_STATUS } from '@/constants';
import customFetch from '@/service/index';
import { Terms } from '@/types/terms';

export const fetchTermsList = async (): Promise<Terms[]> => {
  const { status, data, message } = await customFetch({
    url: `/api/v2/terms`,
  });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};
