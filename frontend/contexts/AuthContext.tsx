"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { getCognitoUser, signOut } from "@/services/cognito";
import { getOrCreateUser } from "@/services/auth";

export type User = Record<string, string> | null;

interface AuthContextType {
	user: User;
	setUser: (user: User) => void;
	isLoading: boolean;
	refreshUser: () => Promise<void>;
	cognitoSignOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const router = useRouter();

	const [user, setUser] = useState<User>(null);
	const [isLoading, setIsLoading] = useState(true);

	const refreshUser = async () => {
		try {
			await getCognitoUser();
			const userData = await getOrCreateUser();
			setUser(userData?.data as User);
		} catch {
			setUser(null);

			// TODO: no network, user is null, what to do? send to login page? but they might try to login.
			// maybe tell them network issues or something.
		} finally {
			setIsLoading(false);
		}
	};

	const cognitoSignOut = async () => {
		await signOut().then(() => {
			router.replace("/login");
		});
	};

	useEffect(() => {
		refreshUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, setUser, isLoading, refreshUser, cognitoSignOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
