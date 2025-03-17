import { useState } from 'react';
import ModalTextInput from '../components/common/ModalTextInput';
import ModalButton from '../components/common/ModalButton';
import { NewFamilyFormProps } from '../assets/models/Family';

const NewFamilyForm: React.FC<NewFamilyFormProps> = ({ handleSubmit, onClose, data, setData }) => {
	const [familyName, setFamilyName] = useState(data);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFamilyName(e.target.value);
		setData(e.target.value);
		setError('');
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<ModalTextInput
				type="text"
				placeholder="Nom de la famille"
				name="familyName"
				value={familyName}
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

export default NewFamilyForm;
