import { ApiReturn } from '../assets/models/Api';
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

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const AddFamilies = async (name: string) => {
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

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const DeleteFamilies = async (id: number) => {
    try {
        const response = await fetch(`${apiUrl}/families/${id}`, {
            method: 'DELETE',
            headers,
        });

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
};