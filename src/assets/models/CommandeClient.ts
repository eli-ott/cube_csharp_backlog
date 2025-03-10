import { Customer, Status } from './Customer';
import { Product } from './Product';

export interface CommandeClient {
	orderId: 0;
	deliveryDate: string;
	deletionTime: string;
	updateTime: string;
	creationTime: string;
	customer: Customer;
	status: Status;
	lines: LineCommandeClient[];
}

export interface LineCommandeClient {
	quantity: 0;
	unitPrice: 0;
	updateTime: string;
	creationTime: string;
	deletionTime: string;
	product: Product;
}
