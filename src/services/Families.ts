import { ApiReturn } from '../assets/models/Api';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
};

export const GetFamilies = async (): Promise<ApiReturn | null> => {
	try {
		const response = await fetch(apiUrl + '/families?size=999999999', {
			method: 'GET',
			headers,
		});

        const data = await response.json();
        return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};
