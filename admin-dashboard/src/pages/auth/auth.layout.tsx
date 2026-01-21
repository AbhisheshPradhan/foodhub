import React from "react";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative flex min-h-screen items-center justify-center">
            <div className="z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                {children}
            </div>
        </div>
    );
};
