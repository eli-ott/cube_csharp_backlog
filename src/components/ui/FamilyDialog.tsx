import React, { useState } from 'react';
import { FamilyDialogProps } from '../../assets/models/Family';
import { AddFamilies } from '../../services/Families';
import NewFamilyForm from '../../features/NewFamilyForm';
import ModalTitle from '../common/ModalTitle';
import { toast } from 'react-toastify';

const FamilyDialog: React.FC<FamilyDialogProps> = ({ isOpen, onClose }) => {
	const [familyName, setFamilyName] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!familyName.trim()) {
			toast.error('Le nom de la famille est requis.');
			return;
		}

		try {
			const response = await AddFamilies(familyName);

			toast.success('Rôle créer avec succès');
			setFamilyName('');
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
				<ModalTitle title="Créer une famille"></ModalTitle>
				<NewFamilyForm handleSubmit={handleSubmit} onClose={onClose} data={familyName} setData={setFamilyName}></NewFamilyForm>
			</div>
		</div>
	);
};

export default FamilyDialog;
