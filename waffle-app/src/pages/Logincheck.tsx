import { useRouter } from 'next/router';
import React from 'react';

export default function Logincheck() {
  const router = useRouter();
  return (
    <>
      <h1>{router.query.id}</h1>
      <h1>{router.query.pw}</h1>
    </>
  );
}
