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
