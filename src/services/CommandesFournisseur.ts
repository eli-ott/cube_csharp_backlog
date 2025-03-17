import { ApiReturn } from '../assets/models/Api';
import { CommandeClient } from '../assets/models/CommandeClient';
import { CreateSupplierOrder } from '../assets/models/SupplierOrder';
import { notify } from '../utils/notify';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

export const GetCommandesFournisseur = async (): Promise<ApiReturn | null> => {
	try {
		const commandesRes = await fetch(apiUrl + '/supplier-orders', {
			method: 'GET',
			headers,
		});
		if (!commandesRes.ok) throw new Error('Une erreur est survenue lors de la récupération des commandes');

		const data = await commandesRes.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const GetCommandeFournisseurById = async (id: number): Promise<CommandeClient | null> => {
	try {
		const commandeRes = await fetch(apiUrl + `/supplier-orders/${id}`, {
			method: 'GET',
			headers,
		});
		if (!commandeRes.ok) throw new Error('Une erreur est survenue lors de la récupération de la commande ' + id);

		const data = await commandeRes.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const CreateCommandeFournisseur = async (commande: CreateSupplierOrder): Promise<CommandeClient | null> => {
	try {
		const createRes = await fetch(apiUrl + `/supplier-orders`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', ...headers },
			body: JSON.stringify(commande),
		});
		if (!createRes.ok) throw new Error("Une erreur est survenue lors de l'ajout de la commande");

		const data = await createRes.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const UpdateCommandeFournisseur = async (commande: CommandeClient): Promise<CommandeClient | null> => {
	try {
		const updateRes = await fetch(apiUrl + `/supplier-orders/${commande.orderId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', ...headers },
			body: JSON.stringify({ ...commande, statusId: commande.status.statusId }),
		});
		if (!updateRes.ok) throw new Error('Une erreur est survenue lors de la modification de la commande');

		const data = await updateRes.json();
		return data;
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
		return null;
	}
};

export const DeleteCommandeFournisseur = async (id: number) => {
	try {
		const deleteCommandeClientRes = await fetch(apiUrl + `/supplier-orders/${id}`, {
			method: 'DELETE',
			headers,
		});

		if (!deleteCommandeClientRes.ok) throw new Error('Une erreur est survenue lors de la suppression de la commande');
	} catch (e) {
		console.error(e);
		notify(e as string, 'error');
	}
};
