import { ApiReturn } from '../assets/models/Api';
import { Family } from '../assets/models/Product';
import { notify } from '../utils/notify';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL!;
const apiKey = process.env.REACT_APP_API_KEY!;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

export const GetFamilies = async (): Promise<ApiReturn | null> => {
	try {
		const response = await fetch(apiUrl + '/families?size=999999999', {
			method: 'GET',
			headers,
		});
		if (!response.ok) throw new Error('Une erreur est survenue');

		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const AddFamilies = async (name: string): Promise<Family | null> => {
	try {
		const response = await fetch(apiUrl + '/families', {
			method: 'POST',
			headers: {
				...headers,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) throw new Error('Erreur lors de la création de la famille');

		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const UpdateFamilies = async (id: number, name: string) => {
	try {
		const response = await fetch(`${apiUrl}/families/${id}`, {
			method: 'PUT',
			headers: {
				...headers,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) throw new Error('Une erreur est survenue');

		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const DeleteFamilies = async (id: number) => {
	try {
		const response = await fetch(`${apiUrl}/families/${id}`, {
			method: 'DELETE',
			headers,
		});
		if (!response.ok) throw new Error('Une erreur est survenue');

		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};
