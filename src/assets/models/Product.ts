import { Review } from "./Customer";

export interface Product {
	productId: number;
	name: string;
	cuvee: string;
	year: number;
	producerName: string;
	isBio: boolean;
	unitPrice: any;
	boxPrice: any;
	quantity: number;
	autoRestock: boolean;
	autoRestockTreshold: number;
	deletionTime: any;
	updateTime: string;
	creationTime: string;
	family: Family;
	supplier: any;
	images: Image[];
	reviews: Review[];
	discount: any;
	familyId?: number;
	supplierId?: number;
}

export interface Family {
	familyId: number;
	name: string;
	deletionTime: any;
	updateTime: string;
	creationTime: string;
	products: any[];
}

export interface Image {
	imageId: string;
	formatType: string;
	imageUrl: string;
	updateTime: string;
	creationTime: string;
}

export interface ProductDialogProps {
	isOpen: boolean,
	onClose: () => void
	onProductCreated: (newProduct: Product) => void
}

export interface ProductFormData {
	name?: string;
	cuvee?: string;
	year?: number;
	producer?: string;
	isBio?: boolean;
	unitPrice?: number;
	boxPrice?: number;
	quantity?: number;
	autoRestock?: boolean;
	autoRestockTreshold?: number;
	familyId?: number;
	supplierId?: number;
	images?: any[];
	producerName?: string;
}