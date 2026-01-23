import axios from "axios";

export const api = axios.create({
	baseURL: `${process.env.API_BASE_URL}/api`,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});
