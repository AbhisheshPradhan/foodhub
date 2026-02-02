"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { EyeClosedIcon, EyeIcon, LoaderCircle } from "lucide-react";

import { Label } from "../form/Label";
import { TextInput } from "../form/input/TextInput";
import { Button } from "../ui/Button";
import { signIn } from "@/services/cognito";
import { getOrCreateUser } from "@/services/auth";

export const SignInForm = () => {
	const searchParams = useSearchParams();
	const emailSearch = searchParams.get("email");
	const router = useRouter();

	const [email, setEmail] = useState(emailSearch || "");
	const [emailError, setEmailError] = useState(false);
	const [emailHint, setEmailHint] = useState("");

	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [passwordHint, setPasswordHint] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		if (validateInputs()) {
			try {
				await signIn(email, password).then(async (res) => {
					await getOrCreateUser();
					router.refresh();
				});
			} catch (error: any) {
				if (error.code === "UserNotConfirmedException") {
					redirect(`/verify?email=${email}`);
				} else {
					setError("Invalid Username or Password");
					setIsLoading(false);
					console.error(error);
				}
			}
		} else {
			setIsLoading(false);
		}
	};

	const validateInputs = () => {
		let isValidInput = true;
		if (!email) {
			setEmailError(true);
			setEmailHint("Email is required");
			isValidInput = false;
		}
		if (email && !isValidEmail(email)) {
			setEmailError(true);
			setEmailHint("Invalid email");
			isValidInput = false;
		}
		if (!password) {
			setPasswordError(true);
			setPasswordHint("Password is required");
			isValidInput = false;
		}
		if (password && (password.length < 8 || password.length > 16)) {
			setPasswordError(true);
			setPasswordHint("Password must be 8-16 characters");
			isValidInput = false;
		}

		return isValidInput;
	};

	const isValidEmail = (email: string) => {
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(String(email).toLowerCase());
	};

	const handleEmailChange = (value: string) => {
		setEmail(value);
		setEmailError(false);
		setEmailHint("");

		if (!value) {
			setEmailError(true);
			setEmailHint("Email is required");
		}
	};

	const handlePasswordChange = (value: string) => {
		setPassword(value);
		setPasswordError(false);
		setPasswordHint("");

		if (!value) {
			setPasswordError(true);
			setPasswordHint("Password is required");
		}
	};

	return (
		<div className="flex flex-col flex-1">
			<div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
				<div>
					<div className="mb-5 sm:mb-8">
						<h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md dark:text-white/90">
							Sign In
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Enter your email and password to sign in!
						</p>
					</div>
					<div>
						<form onSubmit={handleSignIn}>
							<div className="space-y-6">
								<div>
									<Label htmlFor="email">
										Email{" "}
										<span className="text-error-500">
											*
										</span>
									</Label>
									<TextInput
										id="email"
										placeholder="info@gmail.com"
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
											type={
												showPassword
													? "text"
													: "password"
											}
											placeholder="Enter your password"
											value={password}
											onChange={(e) =>
												handlePasswordChange(
													e.target.value,
												)
											}
											minLength={8}
											maxLength={16}
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
										>
											{showPassword ? (
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
								<div className="flex">
									<Link
										href="/reset-password"
										className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
									>
										Forgot password?
									</Link>
								</div>
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
										Sign in
									</Button>
								</div>
							</div>
						</form>

						<div className="mt-5">
							<p className="text-sm font-normal text-center text-gray-700 sm:text-start dark:text-gray-400">
								{`Don't have an account? `}
								<Link
									href="/signup"
									className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
								>
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
