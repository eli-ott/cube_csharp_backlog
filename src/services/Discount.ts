import { NewDiscount } from '../assets/models/Discount';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

export const CreateDiscount = async (discount: NewDiscount) => {
	try {
		const response = await fetch(apiUrl + '/discounts', {
			method: 'POST',
			headers: {
				...headers,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(discount),
		});

		const data = await response.json();
	} catch (e) {
		console.error(e);
	}
};

export const DeleteDiscount = async (idDiscount: number) => {
	try {
		const response = await fetch(apiUrl + `/discounts/${idDiscount}`, {
			method: 'DELETE',
			headers: {
				...headers,
			},
		});
	} catch (e) {
		console.error(e);
	}
};
