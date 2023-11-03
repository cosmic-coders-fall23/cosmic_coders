// app/Providers.tsx
'use client'
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react';

interface ProvidersProps {
  children: ReactNode;
  session: any; // You can type this based on your session object
}

function Providers({ children, session }: ProvidersProps) {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </NextUIProvider>
  );
}

export default Providers;
