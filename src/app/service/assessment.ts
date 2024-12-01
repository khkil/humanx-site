import { SUCCESS_STATUS } from '@/app/constants'
import customFetch from '@/app/service/index'

export const fetchAssessmentUserCount = async (assessmentId: number) => {
  const { status, data, message } = await customFetch({
    url: `/api/v2/assessments/${assessmentId}/users/count`,
  })
  if (status !== SUCCESS_STATUS) {
    throw new Error(message)
  }
  return data
}
