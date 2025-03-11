import { Customer, Status } from './Customer';
import { Product } from './Product';

export interface CommandeClient {
	orderId: number;
	deliveryDate: string;
	deletionTime: string;
	updateTime: string;
	creationTime: string;
	customer: Customer;
	status: Status;
	lines: LineCommandeClient[];
}

export interface LineCommandeClient {
	quantity: number;
	unitPrice: number;
	updateTime: string;
	creationTime: string;
	deletionTime: string;
	product: Product;
}
