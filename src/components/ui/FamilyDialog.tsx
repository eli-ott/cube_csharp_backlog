import React, { useState } from 'react';
import { FamilyDialogProps } from '../../assets/models/Family';
import { AddFamilies } from '../../services/Family';
import NewFamilyForm from '../../features/NewFamilyForm';
import ModalTitle from '../common/ModalTitle';
import { notify } from '../../utils/notify';

const FamilyDialog: React.FC<FamilyDialogProps> = ({ isOpen, onClose, onFamilyCreated }) => {
	const [familyName, setFamilyName] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!familyName.trim()) {
			notify('Le nom de la famille est requis.', 'error');
			return;
		}

		try {
			await AddFamilies(familyName);

			notify('Rôle créer avec succès', 'success');

			setFamilyName('');
			onFamilyCreated();
			onClose();
		} catch (error) {
			console.error('Erreur:', error);
			notify("Une erreur s'est produite.", 'error');
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<ModalTitle title="Créer une famille"></ModalTitle>
				<NewFamilyForm handleSubmit={handleSubmit} onClose={onClose} data={familyName} setData={setFamilyName}></NewFamilyForm>
			</div>
		</div>
	);
};

export default FamilyDialog;
