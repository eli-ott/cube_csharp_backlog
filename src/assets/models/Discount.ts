export interface NewDiscountFormProps {
	handleSubmit: (e: React.FormEvent) => void;
	onClose: () => void;
	data: NewDiscount
	setData: (data: any) => void;
}

export interface DiscountDialogProps {
    productId: number;
	isOpen: boolean;
	onClose: () => void;
	onDiscountCreated: () => void;
}

export interface NewDiscount {
	name?: string;
	value?: number;
	startDate?: string;
	endDate?: string;
	productId?: number;
}