import { Supplier } from './../assets/models/Fournisseurs';
import { ApiReturn } from '../assets/models/Api';
import { NewSupplierFormData } from '../assets/models/Fournisseurs';
import { getTokenFromCookie } from './authentification';
import { notify } from '../utils/notify';

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
		notify(e as string, 'error');
	}
};

export const GetSuppliers = async (page: number, searchParams: any): Promise<ApiReturn | null> => {
	try {
		let searchString = '';

		if (searchParams) {
			Object.keys(searchParams).forEach((param) => {
				searchString += `&${param}=${searchParams[param]}`;
			});
		}

		const suppliersRes = await fetch(apiUrl + `/suppliers?page=${page}${searchString}`, {
			method: 'GET',
			headers,
		});
		if (!suppliersRes.ok) throw new Error('Une erreur est survenu');

		const data = await suppliersRes.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const GetAllSuppliers = async (): Promise<ApiReturn | null> => {
	try {
		const suppliersRes = await fetch(apiUrl + `/suppliers?size=${999999}`, {
			method: 'GET',
			headers,
		});
		if (!suppliersRes.ok) throw new Error('Une erreur est survenu');

		const data = await suppliersRes.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
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
		notify(e as string, 'error');
		return null;
	}
};

export const SaveSupplier = async (supplier: Supplier, id: number): Promise<boolean> => {
	try {
		const response = await fetch(apiUrl + `/suppliers/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', ...headers },
			body: JSON.stringify(supplier),
		});

		if (!response.ok) throw new Error('Failed to update supplier');

		return response.ok;
	} catch (err) {
		notify(err as string, 'error');
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
