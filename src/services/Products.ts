import { ApiReturn } from '../assets/models/Api';
import { Product, ProductFormData } from '../assets/models/Product';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
};

export const GetProducts = async (page: number): Promise<ApiReturn | null> => {
	try {
		const response = await fetch(apiUrl + `/products/?page=${page}`, {
			method: 'GET',
			headers,
		});
		if (!response.ok) throw new Error('Erreur lors de la récupération des produits');

		const data = response.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const GetProductById = async (id: number): Promise<Product | null> => {
	try {
		const response = await fetch(apiUrl + `/products/${id}`, {
			method: 'GET',
			headers,
		});
		if (!response.ok) throw new Error('Erreur lors de la récupération du produit');

		const data = response.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const AddProduct = async (product: FormData): Promise<Product | null> => {
	try {
		const response = await fetch(apiUrl + '/products', {
			method: 'POST',
			headers,
			body: product,
		});
		if (!response.ok) throw new Error('Erreur lors de la création du produit');

		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const UpdateProduct = async (product: FormData): Promise<Product | null> => {
	try {
		const response = await fetch(apiUrl + `/products/${product.get('productId')}`, {
			method: 'PUT',
			headers,
			body: product,
		});
		if (!response.ok) throw new Error('Erreur lors de la mise à jour du produit');

		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const DeleteProduct = async (id: number) => {
	try {
		const response = await fetch(apiUrl + `/products/${id}`, {
			method: 'DELETE',
			headers,
		});
		if (!response.ok) throw new Error('Erreur lors de la suppression du produit');
	} catch (e) {
		console.error(e);
	}
};

export const ToggleBio = async (id: number) => {
	try {
		const response = await fetch(apiUrl + `/products/${id}/toggle-bio`, {
			method: 'PUT',
			headers,
		});
		if (!response.ok) throw new Error('Erreur lors de la modification du produit');
	} catch (e) {
		console.error(e);
	}
};

export const ToggleRestock = async (id: number) => {
	try {
		const response = await fetch(apiUrl + `/products/${id}/toggle-restock`, {
			method: 'PUT',
			headers,
		});
		if (!response.ok) throw new Error('Erreur lors de la modification du produit');
	} catch (e) {
		console.error(e);
	}
};
