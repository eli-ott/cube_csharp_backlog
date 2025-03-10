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
	reviews: any[];
	discount: any;
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
