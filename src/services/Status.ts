import { ApiReturn } from '../assets/models/Api';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
    'x-api-key': apiKey as string,
    Authorization: `Bearer ${token}`,
};

export const GetStatus = async (): Promise<ApiReturn | null> => {
	const response = await fetch(apiUrl + `/statuses?size=${999999999}`, {
        method: 'GET',
        headers
    });

    const data = await response.json();
    return data;
};
