import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AssessmentDetail } from '@/types/assessment';

const StorageKey = 'storage-key';

interface State {
  state: AssessmentDetail | null;
  setState: (state: AssessmentDetail) => void;
  clear: () => void;
}

const useAssessmentStore = create(
  persist<State>(
    (set) => ({
      state: null,
      setState: (state: AssessmentDetail) => {
        set({ state });
      },
      clear: () => set({ state: null }),
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAssessmentStore;
