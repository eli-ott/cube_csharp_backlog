export interface NewEmployeeFormProps {
	isOpen: boolean;
	handleSubmit: (e: React.FormEvent) => void;
	onClose: () => void;
	data: NewEmployeeFormData;
	setData: React.Dispatch<React.SetStateAction<NewEmployeeFormData>>;
}

export interface NewEmployeeFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	roleId: string;
	password: string;
}