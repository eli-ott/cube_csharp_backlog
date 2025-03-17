import React, { useState } from 'react';
import ModalTitle from '../common/ModalTitle';
import { toast } from 'react-toastify';
import { DiscountDialogProps, NewDiscount } from '../../assets/models/Discount';
import { CreateDiscount } from '../../services/Discount';
import NewDiscountForm from '../../features/NewDiscountForm';
import { notify } from '../../utils/notify';

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
			notify('Veuillez remplir tous les champs.', 'warning');
			return;
		}

		if (formData.value! < 0 || formData.value! > 100) {
			notify('Le promotion doit être entre 0 et 100%', 'warning');
			return;
		}
		if (new Date(formData.endDate!).getTime() < new Date().getTime()) {
			notify('La date de fin doit être supérieur à la date du jour', 'warning');
			return;
		}
		if (new Date(formData.startDate!).getTime() < new Date().getTime()) {
			notify('La date de début doit être supérieur à la date du jour', 'warning');
			return;
		}
		if (new Date(formData.startDate!).getTime() > new Date(formData.endDate!).getTime()) {
			notify('La date de début doit être antérieur à la date de fin', 'warning');
			return;
		}

		await CreateDiscount({ ...formData, productId });

		setFormData({
			name: undefined,
			value: undefined,
			startDate: undefined,
			endDate: undefined,
		});

		onDiscountCreated();
		onClose();
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
