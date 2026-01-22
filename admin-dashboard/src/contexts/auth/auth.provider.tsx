import { useEffect, useState, type PropsWithChildren } from "react";

import { AuthContext } from "./auth.context";
import type { User } from "@shared/types/user";

export interface LoginCredentials {
    username: string;
    password: string;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // authAPI
        //     .me()
        //     .then((res) => {
        //         setUser(res);
        //     })
        //     .catch(() => setUser(null))
        //     .finally(() => setIsLoading(false));
    }, []);

    const login = async (credentials: LoginCredentials) => {
        await authAPI
            .login(credentials)
            .then((res) => {
                setUser(res.user);
            })
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    };

    return (
        <AuthContext.Provider value={{ user, login, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
