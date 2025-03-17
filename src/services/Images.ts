import { notify } from '../utils/notify';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

export const DeleteImage = async (imageId: string) => {
	try {
		const response = await fetch(apiUrl + `/images/${imageId}`, {
			method: 'DELETE',
			headers,
		});
		if (!response.ok) throw new Error('Une erreur est survenue');

		return response;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
	}
};
