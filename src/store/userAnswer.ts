import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AssessmentDetail } from '@/types/assessment';
import { UserAnswer } from '@/types/user';

interface UserAnswerState {
  state: UserAnswer[];
  addState: (state: UserAnswer) => void;
  removeState: (index: number) => void;
  clear: () => void;
}

const useUserAnswerStore = create(
  persist<UserAnswerState>(
    (set, get) => ({
      state: [],
      /*[
        { questionId: 1, answerId: 1 },
        { questionId: 2, answerId: 10 },
        { questionId: 3, answerId: 17 },
        { questionId: 4, answerId: 24 },
        { questionId: 5, answerId: 30 },
        { questionId: 6, answerId: 38 },
        { questionId: 7, answerId: 45 },
        { questionId: 8, answerId: 53 },
        { questionId: 9, answerId: 58 },
        { questionId: 10, answerId: 66 },
        { questionId: 11, answerId: 74 },
        { questionId: 12, answerId: 80 },
        { questionId: 13, answerId: 88 },
        { questionId: 14, answerId: 94 },
        { questionId: 15, answerId: 100 },
        { questionId: 16, answerId: 108 },
        { questionId: 17, answerId: 115 },
        { questionId: 18, answerId: 123 },
        { questionId: 19, answerId: 130 },
        { questionId: 20, answerId: 136 },
        { questionId: 21, answerId: 142 },
        { questionId: 22, answerId: 149 },
        { questionId: 23, answerId: 157 },
        { questionId: 24, answerId: 163 },
        { questionId: 25, answerId: 170 },
        { questionId: 26, answerId: 178 },
        { questionId: 27, answerId: 184 },
        { questionId: 28, answerId: 191 },
        { questionId: 29, answerId: 199 },
        { questionId: 30, answerId: 212 },
        { questionId: 31, answerId: 220 },
        { questionId: 32, answerId: 226 },
        { questionId: 33, answerId: 234 },
        { questionId: 34, answerId: 241 },
        { questionId: 35, answerId: 247 },
        { questionId: 36, answerId: 255 },
        { questionId: 37, answerId: 262 },
        { questionId: 38, answerId: 268 },
        { questionId: 39, answerId: 276 },
        { questionId: 40, answerId: 283 },
        { questionId: 41, answerId: 289 },
        { questionId: 42, answerId: 297 },
        { questionId: 43, answerId: 303 },
        { questionId: 44, answerId: 311 },
        { questionId: 45, answerId: 318 },
      ],*/
      addState: (state: UserAnswer) => {
        set({ state: [...get().state, state] });
      },
      removeState: (questionId: number) => {
        set({ state: [...get().state.filter((answer) => answer.questionId !== questionId)] });
      },
      clear: () => set({ state: [] }),
    }),
    {
      name: 'assessment-question-storage-key',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserAnswerStore;
