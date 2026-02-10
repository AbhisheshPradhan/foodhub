import axios from "axios";

export const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_CLEINT_API_BASE_URL}`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000,
	withCredentials: true,
});
