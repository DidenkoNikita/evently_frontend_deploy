'use client';

import BrandPage from "@/components/BrandPage/BrandPage";
import { useEffect, useState } from "react";

export default function EnterTainmentBrandPage(): JSX.Element {
  const [userId, setUserId] = useState<string>('');  

  useEffect(() => {
    setUserId(location.pathname);
  }, []);

  const id: number = Number(userId.slice(29));
  return (
    <>
      <BrandPage 
        id={id}
      />
    </>
  )
}