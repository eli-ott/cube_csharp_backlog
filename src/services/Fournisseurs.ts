import { Supplier } from './../assets/models/Fournisseurs';
import { ApiReturn } from '../assets/models/Api';
import { NewSupplierFormData } from '../assets/models/Fournisseurs';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};


export const DeleteSupplier = async (supplierId: number) => {
	try {
		const deleteSupplierRes = await fetch(apiUrl + `/suppliers/${supplierId}`, {
			method: 'DELETE',
			headers,
		});

		if (!deleteSupplierRes.ok) throw new Error('Une erreur est survenue');
	} catch (e) {
		console.error(e);
	}
};

export const GetSuppliers = async (page: number): Promise<ApiReturn | null> => {
	try {
		const suppliersRes = await fetch(apiUrl + `/suppliers?page=${page}`, {
			method: 'GET',
			headers,
		});
		if (!suppliersRes.ok) throw new Error('Une erreur est survenu');

		const data = await suppliersRes.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const GetSupplierById = async (id: number): Promise<Supplier | null> => {
	try {
		const suppliersRes = await fetch(apiUrl + `/suppliers/${id}`, {
			method: 'GET',
			headers,
		});
		if (!suppliersRes.ok) throw new Error('Une erreur est survenu');

		const data = await suppliersRes.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const SaveSupplier = async (supplier: Supplier, id: number): Promise<boolean> => {
	try {
		const response = await fetch(apiUrl + `/suppliers/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', ...headers },
			body: JSON.stringify({
				firstName: supplier?.firstName,
				lastName: supplier?.lastName,
				email: supplier?.email,
				phone: supplier?.phone,
			}),
		});

		if (!response.ok) throw new Error('Failed to update supplier');

		return response.ok;
	} catch (err) {
		return false;
	}
};

export const CreateSupplier = async (formData: NewSupplierFormData): Promise<Response> => {
	return await fetch(apiUrl + '/suppliers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(formData),
	});
};
