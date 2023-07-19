'use client';

import { useRouter } from "next/navigation";

export default function Custom401(): JSX.Element {
  const router = useRouter();
  return (
    <div>
      <div>You are not authorized</div>
      <div>401</div>
      <button
        onClick={() => router.push('/')}
      >
        Back to start page
      </button>
    </div>
  )
}