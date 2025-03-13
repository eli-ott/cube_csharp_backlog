import { ModalTextInputProps } from '../../assets/models/ModalTextInput';

const ModalTextInput: React.FC<ModalTextInputProps> = ({ name, type, placeholder, value, onChange, required }) => {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="w-full p-2 border rounded-md"
			required={required}
		/>
	);
};

export default ModalTextInput;
