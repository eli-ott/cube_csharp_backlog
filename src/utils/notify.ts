import { toast } from 'react-toastify';

// Fonction `notify` qui prend deux paramètres individuels : message et type
export const notify = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
	switch (type) {
		case 'success':
			toast.success(message); // Affiche un toast de succès
			break;
		case 'error':
			toast.error(message); // Affiche un toast d'erreur
			break;
		case 'warning':
			toast.warn(message);
			break;
		case 'info':
			toast.info(message); // Affiche un toast d'information
			break;
		default:
			toast.info(message); // Affiche un toast d'information par défaut
			break;
	}
};
