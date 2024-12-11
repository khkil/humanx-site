import { User, UserAnswer } from '@/types/user';
import { create } from 'zustand/index';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  state: User | null;
  setState: (state: User) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      state: null, // {"userName":"test","userBirth":"111111","userEmail":"test@naver.com","userPhone":"1"},
      setState: (user: User) => {
        set({ state: user });
      },
    }),
    {
      name: 'user-storage-key',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
