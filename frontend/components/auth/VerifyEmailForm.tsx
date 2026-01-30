"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { Label } from "../form/Label";
import { TextInput } from "../form/input/TextInput";
import { Button } from "../ui/Button";
import { confirmSignUp, resendConfirmationCode } from "@/services/cognito";
import { useAuthValidation } from "@/hooks/useAuthValidation";

export const VerifyEmailForm = () => {
	const router = useRouter();
	const {
		setError,
		setIsLoading,
		verificationCode,
		setVerificationCodeError,
		setVerificationCodeHint,
		handleVerificationCodeChange,
		verificationCodeError,
		verificationCodeHint,
		isLoading,
		error,
	} = useAuthValidation();

	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	if (!email) {
		router.replace("/login");
		return;
	}

	const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		if (!verificationCode) {
			setVerificationCodeError(true);
			setVerificationCodeHint("Verification code is required");
			return;
		}

		setIsLoading(true);
		try {
			await confirmSignUp(email, verificationCode).then((res) => {
				router.replace(`/login?email=${email}`);
			});
		} catch (error) {
			console.error(error);
			setError("Verification failed. Please try again.");
		}
		setIsLoading(false);
	};

	const handleResendCode = async () => {
		setError("");
		setIsLoading(true);
		try {
			await resendConfirmationCode(email);
			setError("");
			alert("Verification code sent!"); //TODO
		} catch (error) {
			console.error(error);
			setError("Failed to resend code. Please try again.");
		}
		setIsLoading(false);
	};

	return (
		<div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
			<div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
				<div>
					<div className="mb-5 sm:mb-8">
						<h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md dark:text-white/90">
							Verify Your Email
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							We sent a verification code to{" "}
							<span className="font-medium text-gray-800 dark:text-white">
								{email}
							</span>
						</p>
					</div>
					<form onSubmit={handleVerification}>
						<div className="space-y-6">
							<div>
								<Label htmlFor="verificationCode">
									Verification Code{" "}
									<span className="text-error-500">*</span>
								</Label>
								<TextInput
									id="verificationCode"
									type="text"
									placeholder="Enter verification code"
									value={verificationCode}
									onChange={(e) =>
										handleVerificationCodeChange(
											e.target.value,
										)
									}
									error={verificationCodeError}
									hint={verificationCodeHint}
								/>
							</div>
							{error && (
								<div className="p-3 text-sm text-center text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
									{error}
								</div>
							)}
							<div>
								<Button
									className="w-full"
									size="sm"
									type="submit"
									disabled={isLoading}
								>
									{isLoading && (
										<LoaderCircle className="size-5 animate-spin" />
									)}
									Verify Email
								</Button>
							</div>
							<div className="text-center">
								<button
									type="button"
									onClick={handleResendCode}
									disabled={isLoading}
									className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 disabled:opacity-50"
								>
									Didn&apos;t receive a code? Resend
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
