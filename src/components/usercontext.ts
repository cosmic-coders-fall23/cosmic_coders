import { createContext } from "react";

interface User {
    username: string;
    email: string;
}


interface ContextInterface {
    user: User;
    setUser: (user: any) => void;
}

export const UserContext = createContext<ContextInterface>({
    user: {
        username: "",
        email: "",
    },
    setUser: (user: any) => {}
});