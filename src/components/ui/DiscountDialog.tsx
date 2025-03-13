import React, { useState } from 'react';
import ModalTitle from '../common/ModalTitle';
import { toast } from 'react-toastify';
import { DiscountDialogProps, NewDiscount } from '../../assets/models/Discount';
import { CreateDiscount } from '../../services/Discount';
import NewDiscountForm from '../../features/NewDiscountForm';

const DiscountDialog: React.FC<DiscountDialogProps> = ({ productId, isOpen, onClose, onDiscountCreated }) => {
	const [formData, setFormData] = useState<NewDiscount>({
		name: undefined,
		value: undefined,
		startDate: undefined,
		endDate: undefined,
	});

	/**
	 * Handle the form submission
	 *
	 * @param {React.FormEvent} e The form event
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (Object.values(formData).some((value) => !value)) {
			toast.warning('Veuillez remplir tous les champs.');
			return;
		}

		try {
			if (formData.value! < 0 || formData.value! > 100) {
				toast.warning('Le promotion doit être entre 0 et 100%');
				return;
			}
			const response = await CreateDiscount({ ...formData, productId });

			setFormData({
				name: undefined,
				value: undefined,
				startDate: undefined,
				endDate: undefined,
			});

			onDiscountCreated();
			onClose();
		} catch (error) {
			console.error("Erreur lors de la création de l'employé:", error);
			toast.error("Une erreur s'est produite.");
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<ModalTitle title="Créer une promotion"></ModalTitle>
				<NewDiscountForm data={formData} setData={setFormData} onClose={onClose} handleSubmit={handleSubmit}></NewDiscountForm>
			</div>
		</div>
	);
};

export default DiscountDialog;
