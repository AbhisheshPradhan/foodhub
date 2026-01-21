import { PageMeta } from "@components/common";
import { AuthLayout } from "./auth.layout";
import { SignInForm } from "@components/auth";

export const SignIn = () => {
    return (
        <>
            <PageMeta title="Sign In - Foodhub" />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
};
