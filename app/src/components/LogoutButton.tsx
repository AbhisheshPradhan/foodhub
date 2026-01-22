import { LinkButton } from "./ui/LinkButton";

export default function LogoutButton() {
	return (
		<LinkButton
			href="/auth/logout"
			className="button logout"
		>
			Log Out
		</LinkButton>
	);
}
