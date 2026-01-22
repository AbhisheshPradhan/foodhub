import { auth0 } from "@/lib/auth0";

import { Designer } from "@/components/designer/Designer";

export default async function DesignerPage() {
	const session = await auth0.getSession();
	const user = session?.user;

	return (
		<>
			<Designer />
		</>
	);
}
