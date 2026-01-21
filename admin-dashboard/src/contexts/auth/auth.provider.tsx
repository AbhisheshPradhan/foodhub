import { useState, type PropsWithChildren } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "./auth.context";
import type { User } from "@shared/types/user";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();

    const [user, setUser] = useState<User | null>(null);

    const value = {
        user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
