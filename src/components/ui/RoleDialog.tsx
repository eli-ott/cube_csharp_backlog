import React, { useState } from 'react';
import { RoleDialogProps } from '../../assets/models/Role';
import { AddRole } from '../../services/Roles';
import NewRoleForm from '../../features/NewRoleForm';
import ModalTitle from '../common/ModalTitle';
import { notify } from '../../utils/notify';

const RoleDialog: React.FC<RoleDialogProps> = ({ isOpen, onClose, onRoleCreated }) => {
	const [roleName, setRoleName] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!roleName.trim()) {
			notify('Le nom du rôle est requis.', 'error');
			return;
		}

		await AddRole(roleName);

		notify('Rôle créer avec succès', 'success');
		setRoleName('');
		onRoleCreated();
		onClose();
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
