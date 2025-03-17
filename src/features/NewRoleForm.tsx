import { useState } from 'react';
import ModalTextInput from '../components/common/ModalTextInput';
import ModalButton from '../components/common/ModalButton';
import { NewRoleFormProps } from '../assets/models/NewRoleForm';

const NewRoleForm: React.FC<NewRoleFormProps> = ({ handleSubmit, onClose, data, setData }) => {
	const [roleName, setRoleName] = useState(data);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setRoleName(e.target.value);
		setData(e.target.value);
		setError('');
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<ModalTextInput
				type="text"
				placeholder="Nom du rôle"
				name="roleName"
				value={roleName}
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

export default NewRoleForm;
