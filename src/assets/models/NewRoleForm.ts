export interface NewRoleFormProps {
	handleSubmit: (e: React.FormEvent) => void;
	onClose: () => void;
	data: string;
	setData: React.Dispatch<React.SetStateAction<string>>;
}
