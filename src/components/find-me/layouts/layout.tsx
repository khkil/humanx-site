import { ReactNode } from 'react';
import FindMeHeader from '@/components/find-me/layouts/Header';
import FindMeFooter from '@/components/find-me/layouts/Footer';

export default function FindMeLayout({ children }: { children: ReactNode }) {
  return (
    <div className='findme__common__container'>
      `
      <div className='findme__common__wrapper'>
        <FindMeHeader />
        {children}
        <FindMeFooter />
      </div>
    </div>
  );
}
