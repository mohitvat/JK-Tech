// app/page.jsx
'use client';

import dynamic from 'next/dynamic';

const Page = dynamic(() => import('./homepage'), { ssr: false });

export default function HomeWrapper() {
  return <Page />;
}
