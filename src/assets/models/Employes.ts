export interface Employee {
	employeeId: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: Role;
	passwordId: number;
	password: any;
	deletionTime: any;
	creationTime: string;
	updateTime: string;
}

export interface Role {
	roleId: number;
	name: string;
	deletionTime: any;
	updateTime: string;
	creationTime: string;
}

export interface RoleCreation {
	roleId: number;
	name: string;
}

export interface EmployeeDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onEmployeeCreated: () => void;
}