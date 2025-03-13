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

		const data = await response.json();
	} catch (e) {
		console.error(e);
		return null;
	}
};
