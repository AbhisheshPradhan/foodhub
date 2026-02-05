"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { Label } from "../form/Label";
import { TextInput } from "../form/input/TextInput";
import { Button } from "../ui/Button";
import { confirmSignUp, resendConfirmationCode } from "@/services/cognito";

interface VerifyEmailFormData {
	verificationCode: string;
}

export const VerifyEmailForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	const [isVerifying, setIsVerifying] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<VerifyEmailFormData>({
		defaultValues: {
			verificationCode: "",
		},
	});

	if (!email) {
		router.replace("/login");
		return;
	}

	const onSubmit = async (data: VerifyEmailFormData) => {
		setError("");
		setIsVerifying(true);

		try {
			await confirmSignUp(email, data.verificationCode);
			router.replace(`/login?email=${email}`);
		} catch (error) {
			console.error(error);
			setError("Verification failed. Please try again.");
		}
		setIsVerifying(false);
	};

	const handleResendCode = async () => {
		setError("");
		setIsResending(true);
		try {
			await resendConfirmationCode(email);
			setError("");
			alert("Verification code sent!"); //TODO
		} catch (error) {
			console.error(error);
			setError("Failed to resend code. Please try again.");
		}
		setIsResending(false);
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-6">
							<div>
								<Label htmlFor="verificationCode">
									Verification Code{" "}
									<span className="text-error-500">*</span>
								</Label>
								<Controller
									name="verificationCode"
									control={control}
									rules={{
										required:
											"Verification code is required",
									}}
									render={({ field }) => (
										<TextInput
											id="verificationCode"
											type="text"
											placeholder="Enter verification code"
											value={field.value}
											onChange={field.onChange}
											error={!!errors.verificationCode}
											hint={
												errors.verificationCode?.message
											}
										/>
									)}
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
									disabled={isVerifying}
								>
									{isVerifying && (
										<LoaderCircle className="size-5 animate-spin" />
									)}
									Verify Email
								</Button>
							</div>
							<div className="text-center">
								<span className="text-sm text-gray-500 dark:text-gray-400">
									Didn&apos;t receive a code?{" "}
								</span>
								<button
									type="button"
									onClick={handleResendCode}
									disabled={isResending}
									className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 disabled:opacity-50"
								>
									Resend
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
