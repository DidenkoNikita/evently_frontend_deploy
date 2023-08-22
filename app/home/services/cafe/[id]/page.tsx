'use client';

import { useEffect, useState } from "react";

import BrandPage from "@/components/BrandPage/BrandPage";

export default function CafeBrandPage(): JSX.Element {

  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    setUserId(location.pathname);
  }, [])  

  const id = userId.slice(20, 24);
  
  return (
    <>
      <BrandPage 
        id={Number(id)}
      />
    </>
  )
}