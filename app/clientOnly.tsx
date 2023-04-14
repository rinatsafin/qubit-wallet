'use client';

import { ReactNode } from 'react';
import { useIsMounted } from '@/shared/hooks';

export default function ClientOnly({ children }: { children: ReactNode }) {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return <div>{children}</div>;
}
