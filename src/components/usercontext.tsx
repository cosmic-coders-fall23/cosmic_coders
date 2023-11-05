import { createContext } from "react";

interface User {
    username: string;
    email: string;
    score: number;
}


interface ContextInterface {
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<ContextInterface>({
    user: {
        username: "",
        email: "",
        score: 0,
    },
    setUser: (user: User) => {}
});