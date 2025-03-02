import React, { useState } from 'react';
import ModalTitle from '../common/ModalTitle';
import { CreateSupplier } from '../../services/Fournisseurs';
import { SupplierDialogProps } from '../../assets/models/Fournisseurs';
import NewSupplierForm from '../../features/NewSupplierForm';

const SupplierDialog: React.FC<SupplierDialogProps> = ({ isOpen, onClose, onSupplierCreated }) => {
	const [formData, setFormData] = useState({
		lastName: '',
		firstName: '',
		contact: '',
		email: '',
		phone: '',
		siret: '',
		address: {
			addressLine: '',
			city: '',
			zipCode: '',
			country: '',
			complement: '',
		},
	});

	/**
	 * Handle the form submission
	 *
	 * @param {React.FormEvent} e The form event
	 * @returns
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (Object.values(formData).some((value) => !value)) {
            alert('Veuillez remplir tous les champs.');
			return;
		}
        
		try {
			const response = await CreateSupplier(formData);

			if (!response.ok) throw new Error("Erreur lors de la création de l'employé");

			setFormData({
				lastName: '',
				firstName: '',
				contact: '',
				email: '',
				phone: '',
				siret: '',
				address: {
					addressLine: '',
					city: '',
					zipCode: '',
					country: '',
					complement: '',
				},
			});

			onSupplierCreated();
			onClose();
		} catch (error) {
			console.error("Erreur lors de la création de l'employé:", error);
			alert("Une erreur s'est produite.");
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-200">
				<NewSupplierForm
					data={formData}
					setData={setFormData}
					isOpen={isOpen}
					onClose={onClose}
					handleSubmit={handleSubmit}></NewSupplierForm>
			</div>
		</div>
	);
};

export default SupplierDialog;
