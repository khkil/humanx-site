import { DEFAULT_ERROR_MESSAGE, SUCCESS_STATUS } from '@/constants';
import customFetch from '@/service/index';
import { Terms } from '@/types/terms';
import { User } from '@/types/user';

export const insertUser = async (user: User): Promise<{ encryptedUserId: string }> => {
  const {
    status,
    data,
    message = DEFAULT_ERROR_MESSAGE,
  } = await customFetch({
    url: `/api/v2/users`,
    method: 'POST',
    params: user,
  });
  if (status !== SUCCESS_STATUS) {
    throw new Error(message);
  }
  return data;
};
