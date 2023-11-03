// app/Providers.tsx
'use client'
import { ReactNode, useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { UserContext } from '@/components/usercontext';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userParsed = JSON.parse(user);
      setUser(userParsed);
    }
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </UserContext.Provider>
  );
}

export default Providers;
