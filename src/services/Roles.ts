import { Role } from '../assets/models/Employes';
import { ApiReturn } from '../assets/models/Api';
import { getTokenFromCookie } from './authentification';

const apiUrl = process.env.REACT_APP_API_URL!;
const apiKey = process.env.REACT_APP_API_KEY!;

const token = getTokenFromCookie();
const headers: HeadersInit = {
	'x-api-key': apiKey as string,
	Authorization: `Bearer ${token}`,
};

// Récupérer tous les rôles
export const GetRoles = async (): Promise<ApiReturn | null> => {
	try {
		const response = await fetch(apiUrl + '/roles?size=999999999', {
			method: 'GET',
			headers,
		});
		if (!response.ok) throw new Error('Erreur lors de la récupération des rôles');
		const data = await response.json();

		return data; // Retourne l'objet ApiReturn (contenant les rôles)
	} catch (e) {
		console.error(e);
		return null;
	}
};

// Ajouter un rôle
export const AddRole = async (roleName: string): Promise<Role | null> => {
	try {
		const response = await fetch(apiUrl + '/roles', {
			method: 'POST',
			headers: {
				...headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: roleName }),
		});
		if (!response.ok) throw new Error('Erreur lors de la création du rôle');

		const data = await response.json();
		return data; // Retourne l'objet Role créé
	} catch (e) {
		console.error(e);
		return null;
	}
};

// Mettre à jour un rôle
export const UpdateRole = async (roleId: number, roleName: string): Promise<Role | null> => {
	try {
		const response = await fetch(`${apiUrl}/roles/${roleId}`, {
			method: 'PUT',
			headers: {
				...headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: roleName, roleId }),
		});

		if (!response.ok) throw new Error('Erreur lors de la mise à jour du rôle');

		const data = await response.json();
		return data; // Retourne l'objet Role mis à jour
	} catch (e) {
		console.error(e);
		return null;
	}
};

// Supprimer un rôle
export const DeleteRole = async (roleId: number): Promise<boolean> => {
	try {
		const response = await fetch(`${apiUrl}/roles/${roleId}`, {
			method: 'DELETE',
			headers,
		});
		if (!response.ok) throw new Error('Erreur lors de la suppression du rôle');

		const data = await response.json();
		return data ? true : false; // Retourne true si la suppression a réussi, sinon false
	} catch (e) {
		console.error(e);
		return false;
	}
};
