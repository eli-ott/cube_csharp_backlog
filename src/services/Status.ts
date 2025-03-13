import { ApiReturn } from '../assets/models/Api';
import { notify } from '../utils/notify';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

export const GetStatus = async (): Promise<ApiReturn | null> => {
	try {
		const response = await fetch(apiUrl + `/statuses?size=${999999999}`, {
			method: 'GET',
			headers,
		});
		if (!response.ok) throw new Error('Une erreur est survenue lors de la récupération des statuts');

		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};
