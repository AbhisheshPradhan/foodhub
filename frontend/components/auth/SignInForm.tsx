"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { EyeClosedIcon, EyeIcon, LoaderCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { Label } from "../form/Label";
import { TextInput } from "../form/input/TextInput";
import { Button } from "../ui/Button";
import { signIn } from "@/services/cognito";
import { getOrCreateUser } from "@/services/auth";
import { EMAIL_REGEX } from "./utils";

interface SignInFormData {
	email: string;
	password: string;
}

export const SignInForm = () => {
	const searchParams = useSearchParams();
	const emailSearch = searchParams.get("email");
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		defaultValues: {
			email: emailSearch || "",
			password: "",
		},
	});

	const onSubmit = async (data: SignInFormData) => {
		setError("");
		setIsLoading(true);

		try {
			await signIn(data.email, data.password).then(async () => {
				await getOrCreateUser();
				router.refresh();
			});
		} catch (error) {
			const err = error as { code?: string };
			if (err.code === "UserNotConfirmedException") {
				redirect(`/verify?email=${data.email}`);
			} else {
				setError("Invalid Username or Password");
				setIsLoading(false);
				console.error(error);
			}
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
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="space-y-6">
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
												placeholder="info@gmail.com"
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
												maxLength: {
													value: 16,
													message:
														"Password must be at most 16 characters",
												},
											}}
											render={({ field }) => (
												<TextInput
													id="password"
													type={
														showPassword
															? "text"
															: "password"
													}
													placeholder="Enter your password"
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
