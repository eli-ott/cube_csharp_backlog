import { notify } from '../utils/notify';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

export const DeleteReview = async (userId: number, productId: number) => {
	try {
		const response = await fetch(apiUrl + '/reviews/delete', {
			method: 'POST',
			headers: {
				...headers,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ userId, productId }),
		});
		if (!response.ok) throw new Error("Une erreur est survenue lors de la suppression d'un avis");
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};
