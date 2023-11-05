'use client'
import {ReactNode, useEffect, useState} from 'react';
import {NextUIProvider} from '@nextui-org/react';
import {UserContext} from '@/components/usercontext';

interface ProvidersProps {
    children: ReactNode;
}

function Providers({children}: ProvidersProps) {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
        const localUser = localStorage.getItem("user");
        return localUser
            ? JSON.parse(localUser)
            : {
                username: "",
                email: "",
                score: 0,
            };
        } else {
            return {
                username: "",
                email: "",
                score: 0,
            };
        }
    });

    useEffect(() => {
        // Run this effect only on the client side
        if (typeof window !== 'undefined') {
            const localUser = localStorage.getItem("user");
            if (localUser) {
                const userParsed = JSON.parse(localUser);
                setUser(userParsed);
            }
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
