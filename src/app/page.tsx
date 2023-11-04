//ap/page.tsx
'use client'
import React from 'react';
import {Image} from "@nextui-org/react";

function HomePage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <Image className="z-20 h-full" src="/cosmiccoderslogo.png"/>
    </div>
  );
}

export default HomePage;
