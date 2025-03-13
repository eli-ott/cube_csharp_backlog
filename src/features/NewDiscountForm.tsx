import { useState } from 'react';
import ModalTextInput from '../components/common/ModalTextInput';
import ModalButton from '../components/common/ModalButton';
import { NewDiscountFormProps } from '../assets/models/Discount';

const NewDiscountForm: React.FC<NewDiscountFormProps> = ({ handleSubmit, onClose, data, setData }) => {
	const [formData, setFormData] = useState(data);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<any>) => {
		const { name, value } = e.target;

		// Ensure correct date format for inputs
		const formattedValue = name.includes('Date') ? new Date(value).toISOString() : value;

		setFormData((prev) => ({
			...prev,
			[name]: name === 'value' ? Number(value) : formattedValue, // Convert value to number if needed
		}));

		setData({ ...formData, [name]: formattedValue });
		setError('');
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<ModalTextInput type="text" placeholder="Nom" name="name" value={formData.name!} onChange={handleChange} required />
			<ModalTextInput
				type="number"
				placeholder="Valeur"
				name="value"
				value={formData.value ? formData.value.toString() : ''}
				onChange={handleChange}
				required
			/>
			<input
				type="date"
				name="startDate"
				onChange={handleChange}
				value={formData.startDate?.split('T')[0] || ''}
				className="w-full p-2 border rounded-md"
			/>
			<input
				type="date"
				name="endDate"
				onChange={handleChange}
				value={formData.endDate?.split('T')[0] || ''}
				required
				className="w-full p-2 border rounded-md"
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}

			<div className="flex justify-end gap-2">
				<ModalButton type="button" isCta={false} label="Annuler" onClick={onClose} />
				<ModalButton type="submit" isCta={true} label="Créer" />
			</div>
		</form>
	);
};

export default NewDiscountForm;
