import { Address } from './Address';
import { Product } from './Product';

export interface Customer {
	customerId: number;
	lastName: string;
	firstName: string;
	email: string;
	phone: string;
	address: Address;
	active: boolean;
	deletionTime: string;
	creationTime: string;
	updateTime: string;
	validationId?: number;
	password?: string;
	reviews: Review[];
	orders: Order[];
}

export interface Review {
	userId: number;
	productId: number;
	rating: number;
	comment: string;
	customerFirstName: string;
	customerLastName: string;
	updateTime: string;
	creationTime: string;
}

export interface Order {
	orderId: number;
	deliveryDate: string;
	deletionTime: string;
	updateTime: string;
	creationTime: string;
	customer: Customer | number;
	status: Status;
	lines: OrderLine[];
}

export interface Status {
	statusId: number;
	name: string;
	deletionTime?: string;
}

export interface OrderLine {
	quantity: number;
	unitPrice: number;
	updateTime: string;
	creationTime: string;
	deletionTime: string;
	product: Product;
}

export const customerFields = {
	customerId: 'Id client',
	supplierId: 'Id',
	lastName: 'Nom de famille',
	firstName: 'Prénom',
	email: 'Email',
	phone: 'Téléphone',
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
    orderId: "Id",
    status: 'Status',
    deliveryDate: "Date de livraison",
    productId: 'Id',
    rating: 'Note',
    comment: 'Commentaire',
    active: 'Actif'
};

export const uselessFields = [
    "validationId",
    "password",
    
]