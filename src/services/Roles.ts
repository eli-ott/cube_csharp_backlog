import { Role } from "../assets/models/Employes";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
};

export const GetAllRoles = async (): Promise<Role[] | null> => {
	try {
		const response = await fetch(apiUrl + `/roles?size=${Math.round(999999999)}`, {
			method: 'GET',
			headers,
		});
		if (!response.ok) throw new Error('Failed to fetch roles');
		const data = await response.json();
        console.log(response, data);
        return data.items;
	} catch (err) {
		return null;
	}
};
