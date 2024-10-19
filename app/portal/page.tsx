"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PortalContent = dynamic(() => import('./PortalContent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function PortalPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PortalContent />
    </Suspense>
  );
}