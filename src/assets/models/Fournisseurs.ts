import { Address } from 'cluster';
import { Product } from './Product';

export interface Supplier {
	supplierId: number;
	lastName: string;
	firstName: string;
	contact: string;
	email: string;
	phone: string;
	siret: string;
	deletionTime: any;
	updateTime: string;
	creationTime: string;
	address: Address;
	products?: Product[];
}

export interface NewSupplierProps {
	isOpen: boolean;
	handleSubmit: (e: React.FormEvent) => void;
	onClose: () => void;
	data: NewSupplierFormData;
	setData: React.Dispatch<React.SetStateAction<NewSupplierFormData>>;
}

export interface SupplierDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSupplierCreated: () => void;
}

export interface NewSupplierFormData {
	lastName: string;
	firstName: string;
	contact: string;
	email: string;
	phone: string;
	siret: string;
	address: {
		addressLine: string;
		city: string;
		zipCode: string;
		country: string;
		complement: string;
	};
}

export const supplierFields = {
	supplierId: 'Id',
	lastName: 'Nom de famille',
	firstName: 'Prénom',
	contact: 'Contact',
	email: 'Email',
	phone: 'Téléphone',
	siret: 'Siret',
	deletionTime: 'Date de suppression',
	updateTime: 'Date de mise à jour',
	creationTime: 'Date de création',
	addressId: 'Id',
	addressLine: 'Adresse',
	city: 'Ville',
	zipCode: 'Code postal',
	country: 'Pays',
	complement: 'Complément',
	cuvee: 'Cuvée',
	year: 'Année',
	producer: 'Producteur',
	quantity: 'Quantité',
	autoRestock: 'Commandes automatique',
};

export const modifiableFields = [
	'lastName',
	'firstName',
	'contact',
	'email',
	'phone',
	'siret',
	'addressLine',
	'city',
	'zipCode',
	'country',
	'complement',
];