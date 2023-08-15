'use client';

import { useEffect, useState } from "react";

import BrandPage from "@/components/BrandPage/BrandPage";

export default function CafeBrandPage(): JSX.Element {
  const [userId, setUserId] = useState<string>('');  

  useEffect((): void => {
    setUserId(location.pathname);
  }, [])

  const id: number = Number(userId.slice(20));

  return (
    <>
      <BrandPage 
        id={id}
      />
    </>
  )
}