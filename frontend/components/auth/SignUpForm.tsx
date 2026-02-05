"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeClosedIcon, EyeIcon, LoaderCircle, Check, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { Label } from "../form/Label";
import { TextInput } from "../form/input/TextInput";
import { Button } from "../ui/Button";
import { signUp } from "@/services/cognito";
import { EMAIL_REGEX } from "./utils";

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const SignUpForm = () => {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpFormData>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const password = watch("password");

	const hasMinLength = password.length >= 8;
	const hasNumber = /\d/.test(password);
	const hasLowercase = /[a-z]/.test(password);
	const hasUppercase = /[A-Z]/.test(password);
	const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	const onSubmit = async (data: SignUpFormData) => {
		setError("");
		setIsLoading(true);

		try {
			await signUp(data.name, data.email, data.password);
			router.replace(`/verify?email=${data.email}`);
		} catch (error: unknown) {
			console.error(error);
			setError("Sign up failed. Please try again.");
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
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-5">
								<div>
									<Label htmlFor="name">
										Name{" "}
										<span className="text-error-500">
											*
										</span>
									</Label>
									<Controller
										name="name"
										control={control}
										rules={{
											required: "Name is required",
											minLength: {
												value: 2,
												message:
													"Name must be at least 2 characters",
											},
										}}
										render={({ field }) => (
											<TextInput
												id="name"
												type="text"
												placeholder="Enter your name"
												value={field.value}
												onChange={field.onChange}
												error={!!errors.name}
												hint={errors.name?.message}
											/>
										)}
									/>
								</div>
								<div>
									<Label htmlFor="email">
										Email{" "}
										<span className="text-error-500">
											*
										</span>
									</Label>
									<Controller
										name="email"
										control={control}
										rules={{
											required: "Email is required",
											pattern: {
												value: EMAIL_REGEX,
												message: "Invalid email",
											},
										}}
										render={({ field }) => (
											<TextInput
												id="email"
												type="email"
												placeholder="Enter your email"
												value={field.value}
												onChange={field.onChange}
												error={!!errors.email}
												hint={errors.email?.message}
											/>
										)}
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
										<Controller
											name="password"
											control={control}
											rules={{
												required:
													"Password is required",
												minLength: {
													value: 8,
													message:
														"Password must be at least 8 characters",
												},
												validate: {
													hasNumber: (value) =>
														/\d/.test(value) ||
														"Password must contain a number",
													hasLowercase: (value) =>
														/[a-z]/.test(value) ||
														"Password must contain a lowercase letter",
													hasUppercase: (value) =>
														/[A-Z]/.test(value) ||
														"Password must contain an uppercase letter",
													hasSymbol: (value) =>
														/[!@#$%^&*(),.?":{}|<>]/.test(
															value,
														) ||
														"Password must contain a symbol",
												},
											}}
											render={({ field }) => (
												<TextInput
													id="password"
													placeholder="Enter password"
													type={
														showPassword
															? "text"
															: "password"
													}
													value={field.value}
													onChange={field.onChange}
													error={!!errors.password}
													hint={
														errors.password?.message
													}
												/>
											)}
										/>
										<button
											type="button"
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className={`absolute top-1/2 right-4 z-30 ${!errors.password ? "-translate-y-2" : "-translate-y-5"} cursor-pointer`}
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
										<Controller
											name="confirmPassword"
											control={control}
											rules={{
												required:
													"Please confirm your password",
												validate: (value) =>
													value === password ||
													"Passwords do not match",
											}}
											render={({ field }) => (
												<TextInput
													id="confirmPassword"
													placeholder="Re-enter password"
													type={
														showConfirmPassword
															? "text"
															: "password"
													}
													value={field.value}
													onChange={field.onChange}
													error={
														!!errors.confirmPassword
													}
													hint={
														errors.confirmPassword
															?.message
													}
												/>
											)}
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword,
												)
											}
											className={`absolute top-1/2 right-4 z-30 ${!errors.confirmPassword ? "-translate-y-2" : "-translate-y-5"} cursor-pointer`}
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
