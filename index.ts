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

interface CampusResponse {
	id: number,
	name: string,
	time_zone: string,
	language: {
		id: number,
		name: string,
		identifier: string,
	},
	users_count: number,
	vogsphere_id: number,
	country: string,
	address: string,
	zip: string,
	city: string,
	website: string,
	facebook: string,
	twitter: string,
	active: boolean,
	public: boolean,
	email_extension: string,
	default_hidden_phone: boolean,
	endpoint: {
		id: number,
		url: string,
		description: string,
		created_at: string,
		updated_at: string
	}
}

interface EventResponse {
	id: number,
	name: string,
	description: string,
	location: string,
	kind: string,
	max_people: number,
	nbr_susbcribers: number,
	begin_at: string,
	end_at: string,
	campus_ids: number[],
	cursus_ids: number[],
	themes: {
		created_at: string,
		id: number,
		name: string,
		updated_at: string
	}[],
	waitlist: boolean,
	prohibition_of_cancellation: number,
	created_at: string,
	updated_at: string
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

async function getCampusId(token: string, campus_name: string): Promise<number | undefined> {
	return axios.get(`https://api.intra.42.fr/v2/campus/${campus_name}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((response: AxiosResponse<CampusResponse>) => {
			return response.data.id;
		})
		.catch(error => {
			console.error("Error retrieving campus ID:", error);
			return undefined;
		}
		);
}

async function getEvents(token: string, campus_id: number): Promise<EventResponse[] | undefined> {
	return axios.get(`https://api.intra.42.fr/v2/campus/${campus_id}/events`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((response: AxiosResponse<EventResponse[]>) => {
			return response.data;
		})
		.catch(error => {
			console.error("Error retrieving events:", error);
			return undefined;
		});
}

async function main() {
	const token = await getToken();
	if (!token) {
		console.error("Token not retrieved, check your credentials.");
		return;
	} else {
		console.log("Token successfully retrieved:", token);
	}
	const campusId = await getCampusId(token, 'paris');
	if (!campusId) {
		console.error("Campus ID not retrieved, check your token or campus name.");
		return;
	}
	const dataEvents = await getEvents(token, campusId);
	if (!dataEvents) {
		console.error("Events not retrieved, check your token or campus ID.");
		return;
	} else {
		dataEvents.forEach(event => {
			console.log(`Event: ${event.name}`);
		});
	}
}

main();
