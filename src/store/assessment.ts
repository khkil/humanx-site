import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AssessmentDetail } from '@/types/assessment';

interface AssessmentState {
  state: AssessmentDetail | null; // {"assessmentName":"나를 찾아줘","totalPage":15}
  setState: (state: AssessmentDetail) => void;
  clear: () => void;
}

const useAssessmentStore = create(
  persist<AssessmentState>(
    (set) => ({
      //state: null,
      state: { assessmentName: '나를 찾아줘', totalPage: 15 },
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
