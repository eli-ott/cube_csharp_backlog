import { useState } from 'react';
import ModalTextInput from '../components/common/ModalTextInput';
import ModalButton from '../components/common/ModalButton';
import { NewSupplierOrderFormProps } from '../assets/models/SupplierOrder';

const NewSupplierOrder: React.FC<NewSupplierOrderFormProps> = ({ handleSubmit, onClose, data, setData }) => {
	const [quantity, setQuantity] = useState(data);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setQuantity(e.target.value);
		setData(e.target.value);
		setError('');
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<ModalTextInput
				type="number"
				placeholder="Quantité"
				name="quantity"
				value={quantity}
				onChange={handleChange}
				required={true}></ModalTextInput>
			{error && <p className="text-red-500 text-sm">{error}</p>}

			<div className="flex justify-end gap-2">
				<ModalButton type="button" isCta={false} label="Annuler" onClick={onClose}></ModalButton>
				<ModalButton type="submit" isCta={true} label="Créer"></ModalButton>
			</div>
		</form>
	);
};

export default NewSupplierOrder;
