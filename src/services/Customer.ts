import { Customer } from '../assets/models/Customer';
import { ApiReturn } from '../assets/models/Api';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const headers: HeadersInit = {
    'x-api-key': apiKey as string,
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
};

export const DeleteCustomer = async (customerId: number) => {
    try {
        const deleteCustomerRes = await fetch(apiUrl + `/customers/${customerId}`, {
            method: 'DELETE',
            headers,
        });

        if (!deleteCustomerRes.ok) throw new Error('Une erreur est survenue');
    } catch (e) {
        console.error(e);
    }
};

export const GetCustomers = async (page: number): Promise<ApiReturn | null> => {
    try {
        const customersRes = await fetch(apiUrl + `/customers?page=${page}`, {
            method: 'GET',
            headers,
        });
        if (!customersRes.ok) throw new Error('Une erreur est survenu');

        const data = await customersRes.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const GetCustomerById = async (id: number): Promise<Customer | null> => {
    try {
        const customersRes = await fetch(apiUrl + `/customers/${id}`, {
            method: 'GET',
            headers,
        });
        if (!customersRes.ok) throw new Error('Une erreur est survenu');

        const data = await customersRes.json();
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
};