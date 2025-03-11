import { ModalButtonProps } from "../../assets/models/ModalButton";

const ModalButton: React.FC<ModalButtonProps> = ({label, type, onClick, isCta}) => {
	return (
		<button
			type={type}
            onClick={onClick}
			className={`h-10 w-52 bg-gray-${isCta ? '700': '100'} text-${isCta ? 'white': 'black'} font-medium rounded-md shadow-md hover:bg-gray-800 ${isCta ? null: 'hover:text-white'} transition-all cursor-pointer`}>
			{label}
		</button>
	);
};
export default ModalButton;
