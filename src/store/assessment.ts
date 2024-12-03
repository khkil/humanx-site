import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AssessmentDetail } from '@/types/assessment';

interface AssessmentState {
  state: AssessmentDetail | null;
  setState: (state: AssessmentDetail) => void;
  clear: () => void;
}

const useAssessmentStore = create(
  persist<AssessmentState>(
    (set) => ({
      state: null,
      setState: (state: AssessmentDetail) => {
        set({ state });
      },
      clear: () => set({ state: null }),
    }),
    {
      name: 'assessment-storage-key',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAssessmentStore;
