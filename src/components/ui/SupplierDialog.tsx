import React, { useState } from 'react';
import ModalTitle from '../common/ModalTitle';
import { CreateSupplier } from '../../services/Fournisseurs';
import { SupplierDialogProps } from '../../assets/models/Fournisseurs';
import NewSupplierForm from '../../features/NewSupplierForm';
import { toast } from 'react-toastify';
import { notify } from '../../utils/notify';

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
			notify('Veuillez remplir tous les champs.', 'warning');
			return;
		}

		try {
			const phoneReg = /[0-9]{10}/g;
			const zipCodeReg = /[0-9]{5}/g;
			const mailReg =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

			if (!phoneReg.test(formData.phone)) {
				notify("Le numéro de téléphone n'est pas valide", 'warning');
				return;
			}
			if (!mailReg.test(formData.email)) {
				notify("L'email n'est pas valide", 'warning');
				return;
			}
			if (!zipCodeReg.test(formData.address.zipCode)) {
				notify("Le code postal n'est pas valide", 'warning');
				return;
			}

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
			notify("Une erreur s'est produite.", 'error');
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
