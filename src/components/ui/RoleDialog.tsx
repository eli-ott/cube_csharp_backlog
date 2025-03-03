import React, { useState } from 'react';
import { RoleDialogProps } from '../../assets/models/Role';
import { CreateRole } from '../../services/Roles';
import NewRoleForm from '../../features/NewRoleForm';
import ModalTitle from '../common/ModalTitle';
import { toast } from 'react-toastify';

const RoleDialog: React.FC<RoleDialogProps> = ({ isOpen, onClose }) => {
	const [roleName, setRoleName] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!roleName.trim()) {
			toast.error('Le nom du rôle est requis.');
			return;
		}

		try {
			const response = await CreateRole(roleName);

			if (!response.ok) throw new Error('Erreur lors de la création du rôle');

			toast.success('Rôle créer avec succès');
			setRoleName('');
			onClose();
		} catch (error) {
			console.error('Erreur:', error);
			toast.error("Une erreur s'est produite.");
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<ModalTitle title="Créer un rôle"></ModalTitle>
				<NewRoleForm handleSubmit={handleSubmit} onClose={onClose} data={roleName} setData={setRoleName}></NewRoleForm>
			</div>
		</div>
	);
};

export default RoleDialog;
