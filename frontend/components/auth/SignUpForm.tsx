"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeClosedIcon, EyeIcon, LoaderCircle, Check, X } from "lucide-react";

import { Label } from "../form/Label";
import { TextInput } from "../form/input/TextInput";
import { Button } from "../ui/Button";
import { signUp } from "@/services/cognito";
import { useAuthValidation } from "@/hooks/useAuthValidation";

export const SignUpForm = () => {
	const router = useRouter();
	const {
		name,
		handleNameChange,
		nameError,
		nameHint,
		email,
		handleEmailChange,
		emailError,
		emailHint,
		password,
		handlePasswordChange,
		showPassword,
		passwordError,
		passwordHint,
		setShowPassword,
		hasMinLength,
		hasNumber,
		hasLowercase,
		hasUppercase,
		hasSymbol,
		confirmPassword,
		showConfirmPassword,
		setShowConfirmPassword,
		handleConfirmPasswordChange,
		confirmPasswordError,
		confirmPasswordHint,
		setError,
		setIsLoading,
		validateInputs,
		isLoading,
		error,
	} = useAuthValidation();

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (validateInputs("sign-up")) {
			try {
				await signUp(name, email, password);
				router.replace(`/verify?email=${email}`);
			} catch (error: unknown) {
				console.error(error);
				setError("Sign up failed. Please try again.");
			}
		}
		setIsLoading(false);
	};

	return (
		<div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
			<div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
				<div>
					<div className="mb-5 sm:mb-8">
						<h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md dark:text-white/90">
							Sign Up
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Enter your email and password to sign up!
						</p>
					</div>
					<div>
						<form onSubmit={handleSignUp}>
							<div className="space-y-5">
								<div>
									<Label htmlFor="email">
										Name{" "}
										<span className="text-error-500">
											*
										</span>
									</Label>
									<TextInput
										id="name"
										type="text"
										placeholder="Enter your name"
										value={name}
										onChange={(e) =>
											handleNameChange(e.target.value)
										}
										error={nameError}
										hint={nameHint}
									/>
								</div>
								<div>
									<Label htmlFor="email">
										Email{" "}
										<span className="text-error-500">
											*
										</span>
									</Label>
									<TextInput
										id="email"
										type="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) =>
											handleEmailChange(e.target.value)
										}
										error={emailError}
										hint={emailHint}
									/>
								</div>
								<div>
									<Label htmlFor="password">
										Password{" "}
										<span className="text-error-500">
											*
										</span>
									</Label>
									<div className="relative">
										<TextInput
											id="password"
											placeholder="Enter password"
											type={
												showPassword
													? "text"
													: "password"
											}
											value={password}
											onChange={(e) =>
												handlePasswordChange(
													e.target.value,
												)
											}
											error={passwordError}
											hint={passwordHint}
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className={`absolute top-1/2 right-4 z-30 ${!passwordError ? "-translate-y-2" : "-translate-y-5"} cursor-pointer`}
											aria-label={
												showPassword
													? "Hide password"
													: "Show password"
											}
											tabIndex={-1}
										>
											{showPassword ? (
												<EyeIcon className="size-5" />
											) : (
												<EyeClosedIcon className="size-5" />
											)}
										</button>
									</div>
									{password && (
										<div className="mt-3 space-y-1">
											<PasswordRequirement
												met={hasMinLength}
												text="At least 8 characters"
											/>
											<PasswordRequirement
												met={hasNumber}
												text="Use a number"
											/>
											<PasswordRequirement
												met={hasLowercase}
												text="Use a lowercase letter"
											/>
											<PasswordRequirement
												met={hasUppercase}
												text="Use an uppercase letter"
											/>
											<PasswordRequirement
												met={hasSymbol}
												text="Use a symbol"
											/>
										</div>
									)}
								</div>
								<div>
									<Label htmlFor="confirmPassword">
										Confirm Password{" "}
										<span className="text-error-500">
											*
										</span>
									</Label>
									<div className="relative">
										<TextInput
											id="confirmPassword"
											placeholder="Re-enter password"
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											value={confirmPassword}
											onChange={(e) =>
												handleConfirmPasswordChange(
													e.target.value,
												)
											}
											error={confirmPasswordError}
											hint={confirmPasswordHint}
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword,
												)
											}
											className={`absolute top-1/2 right-4 z-30 ${!confirmPasswordError ? "-translate-y-2" : "-translate-y-5"} cursor-pointer`}
											aria-label={
												showConfirmPassword
													? "Hide password"
													: "Show password"
											}
											tabIndex={-1}
										>
											{showConfirmPassword ? (
												<EyeIcon className="size-5" />
											) : (
												<EyeClosedIcon className="size-5" />
											)}
										</button>
									</div>
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
										Sign Up
									</Button>
								</div>
							</div>
						</form>

						<div className="mt-5">
							<p className="text-sm font-normal text-center text-gray-700 sm:text-start dark:text-gray-400">
								Already have an account?{" "}
								<Link
									href="/login"
									className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
								>
									Sign In
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
	<div className="flex items-center gap-2 text-sm">
		{met ? (
			<Check className="text-green-500 size-4" />
		) : (
			<X className="text-gray-400 size-4" />
		)}
		<span className={met ? "text-green-500" : "text-gray-500"}>{text}</span>
	</div>
);
