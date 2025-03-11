export interface ModalTextInputProps {
	name: string;
	type: string;
	placeholder: string;
	value: string;
	required: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}