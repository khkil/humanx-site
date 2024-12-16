'use client';

import useUserStore from '@/store/user';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentResultPage() {
  const router = useRouter();
  const { state: user, setState } = useUserStore();

  useEffect(() => {
    if (!user?.encryptedUserId) {
      //router.push('/assessments/find-me');
    }
  }, []);
  return <div>{JSON.stringify(user.encryptedUserId)}</div>;
}
