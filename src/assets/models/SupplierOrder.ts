import { Product } from './Product';

export interface SupplierOrderDialogProps {
	onOrderCreated: () => void;
	product: Product;
	isOpen: boolean;
	onClose: () => void;
}

export interface NewSupplierOrderFormProps {
	handleSubmit: (e: React.FormEvent) => void;
	onClose: () => void;
	data: string;
	setData: React.Dispatch<React.SetStateAction<string>>;
}

export interface CreateSupplierOrder {
	employeeId: number;
	statusId: number;
	deliveryDate: string;
	orderLines: [
		{
			productId: number;
			unitPrice: number;
			quantity: number;
		}
	];
}
