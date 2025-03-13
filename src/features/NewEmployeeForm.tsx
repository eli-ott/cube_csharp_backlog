import { useEffect, useState } from 'react';
import { Role, RoleCreation } from '../assets/models/Employes';
import { GetRoles } from '../services/Roles';
import { validatePassword } from '../utils/Password';
import ModalButton from '../components/common/ModalButton';
import ModalTextInput from '../components/common/ModalTextInput';
import ModalSelect from '../components/common/ModalSelect';
import { NewEmployeeFormProps } from '../assets/models/NewEmployeeForm';
import { getRoles } from '@testing-library/dom';

const NewEmployeeForm: React.FC<NewEmployeeFormProps> = ({ isOpen, handleSubmit, onClose, data, setData }) => {
	const [roles, setRoles] = useState<RoleCreation[]>([]);
	const [formData, setFormData] = useState(data);
	const [passwordError, setPasswordError] = useState('');

	useEffect(() => {
		if (isOpen) {
			fetchRoles();
		}
	}, [isOpen]);

	const fetchRoles = async () => {
		setRoles((await GetRoles())?.items as Role[]);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setData(formData);

		// Validate password in real-time
		if (e.target.name === 'password') {
			setPasswordError(validatePassword(e.target.value));
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<ModalTextInput
				name="firstName"
				type="text"
				placeholder="Prénom"
				value={formData.firstName}
				onChange={handleChange}
				required={true}
			/>
			<ModalTextInput
				name="lastName"
				type="text"
				placeholder="Nom de famille"
				value={formData.lastName}
				onChange={handleChange}
				required={true}
			/>
			<ModalTextInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required={true} />
			<ModalTextInput name="phone" type="text" placeholder="Téléphone" value={formData.phone} onChange={handleChange} required={true} />
			<ModalSelect
				name="roleId"
				value={formData.roleId}
				options={roles}
				onChange={handleChange}
				optionValue="roleId"
				optionLabel="name"
				required={true}></ModalSelect>
			<div>
				<ModalTextInput
					name="password"
					type="password"
					placeholder="Mot de passe"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				{passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
			</div>

			<div className="flex justify-end gap-2">
				<ModalButton type="button" onClick={onClose} label="Annuler" isCta={false}></ModalButton>
				<ModalButton type="submit" label="Créer" isCta={true}></ModalButton>
			</div>
		</form>
	);
};

export default NewEmployeeForm;
