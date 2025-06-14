import axios, { type AxiosResponse } from "axios";
require('dotenv').config();

interface TokenResponse {
	access_token: string,
	token_type: string,
	expires_in: number,
	scope: string;
	created_at: number;
	secret_valid_until: number
}

async function getToken(): Promise<string | undefined> {
	const clientId = process.env.CLIENT_ID;
	const clientSecret = process.env.CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		console.error("CLIENT_ID or CLIENT_SECRET not defined");
		return Promise.resolve(undefined);
	}

	return axios.post('https://api.intra.42.fr/oauth/token', {
		grant_type: 'client_credentials',
		client_id: clientId,
		client_secret: clientSecret
	})
		.then((response: AxiosResponse<TokenResponse>) => {
			return response.data.access_token;
		})
		.catch(error => {
			console.error("Error retrieving token:", error);
			return undefined;
		});
}

async function main() {
	const token = await getToken();
	if (!token) {
		console.error("Token not retrieved, check your credentials.");
	} else {
		console.log("Token successfully retrieved:", token);
	}
}

main();
