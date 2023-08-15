'use client';

import { useEffect, useState } from "react";

import BrandPage from "@/components/BrandPage/BrandPage";

export default function LeisureBrandPage(): JSX.Element {
  const [userId, setUserId] = useState<string>('');  

  useEffect((): void => {
    setUserId(location.pathname);
  }, []);

  const id: number = Number(userId.slice(23));
  
  return (
    <>
      <BrandPage 
        id={id}
      />
    </>
  )
}