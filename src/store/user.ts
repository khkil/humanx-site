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
      addState: (state: UserAnswer) => {
        set({ state: [...get().state, state] });
      },
      removeState: (index: number) => {
        set({ state: [...get().state.filter((_, i) => i !== index)] });
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
