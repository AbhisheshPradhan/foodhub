import { SignUpForm } from "@components/auth";
import { AuthLayout } from "./auth.layout";
import { PageMeta } from "@components/common";

export const SignUp = () => {
    return (
        <>
            <PageMeta title="Sign Up - Foodhub" />
            <AuthLayout>
                <SignUpForm />
            </AuthLayout>
        </>
    );
};
