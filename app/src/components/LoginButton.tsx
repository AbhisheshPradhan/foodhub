import Link from "next/link";
import { Button } from "./ui/Button";

export default function LoginButton() {
	return (
		<Link
			href="/auth/login"
			className="button login"
		>
			Log In
		</Link>
	);
}
