import { useState } from "react";

export const useAuthValidation = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [verificationCode, setVerificationCode] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [nameError, setNameError] = useState(false);
	const [nameHint, setNameHint] = useState("");

	const [emailError, setEmailError] = useState(false);
	const [emailHint, setEmailHint] = useState("");

	const [passwordError, setPasswordError] = useState(false);
	const [passwordHint, setPasswordHint] = useState("");

	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [confirmPasswordHint, setConfirmPasswordHint] = useState("");

	const [verificationCodeError, setVerificationCodeError] = useState(false);
	const [verificationCodeHint, setVerificationCodeHint] = useState("");

	const hasMinLength = password.length >= 8;
	const hasNumber = /\d/.test(password);
	const hasLowercase = /[a-z]/.test(password);
	const hasUppercase = /[A-Z]/.test(password);
	const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

	const handleNameChange = (value: string) => {
		setName(value);
		setNameError(false);
		setNameHint("");

		if (!value) {
			setNameError(true);
			setNameHint("Name is required");
		}
	};

	const isValidEmailFormat = (email: string) => {
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(String(email).toLowerCase());
	};

	const validateInputs = (formType: "sign-up" | "sign-in") => {
		let isValid = true;

		setEmailError(false);
		setEmailHint("");
		setPasswordError(false);
		setPasswordHint("");
		setConfirmPasswordError(false);
		setConfirmPasswordHint("");

		if (formType == "sign-up") {
			isValid = validateName();
			isValid = validateConfirmPassword();
		}

		isValid = validateEmail();
		isValid = validatePassword();

		return isValid;
	};

	const validateName = () => {
		if (!name) {
			setNameError(true);
			setNameHint("Name is required");
			return false;
		}
		return true;
	};

	const validateEmail = () => {
		if (!email) {
			setEmailError(true);
			setEmailHint("Email is required");
			return false;
		} else if (!isValidEmailFormat(email)) {
			setEmailError(true);
			setEmailHint("Invalid email");
			return false;
		}
		return true;
	};

	const validatePassword = () => {
		if (!password) {
			setPasswordError(true);
			setPasswordHint("Password is required");
			return false;
		} else if (
			!hasMinLength ||
			!hasNumber ||
			!hasLowercase ||
			!hasUppercase ||
			!hasSymbol
		) {
			setPasswordError(true);
			setPasswordHint("Password does not meet all requirements");
			return false;
		}
		return true;
	};

	const validateConfirmPassword = () => {
		if (!confirmPassword) {
			setConfirmPasswordError(true);
			setConfirmPasswordHint("Please confirm your password");
			return false;
		} else if (password !== confirmPassword) {
			setConfirmPasswordError(true);
			setConfirmPasswordHint("Passwords do not match");
			return false;
		}
		return true;
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

	const handleConfirmPasswordChange = (value: string) => {
		setConfirmPassword(value);
		setConfirmPasswordError(false);
		setConfirmPasswordHint("");

		if (!value) {
			setConfirmPasswordError(true);
			setConfirmPasswordHint("Please confirm your password");
		} else if (password !== value) {
			setConfirmPasswordError(true);
			setConfirmPasswordHint("Passwords do not match");
		}
	};

	const handleVerificationCodeChange = (value: string) => {
		setVerificationCode(value);
		setVerificationCodeError(false);
		setVerificationCodeHint("");

		if (!value) {
			setVerificationCodeError(true);
			setVerificationCodeHint("Verification code is required");
		}
	};

	return {
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
		verificationCode,
		setVerificationCodeError,
		setVerificationCodeHint,
		handleVerificationCodeChange,
		verificationCodeError,
		verificationCodeHint,
		isLoading,
		error,
	};
};
