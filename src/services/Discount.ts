import { NewDiscount } from '../assets/models/Discount';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
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

		console.log(response, await response.json());

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
