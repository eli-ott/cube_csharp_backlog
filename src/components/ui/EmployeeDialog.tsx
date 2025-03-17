import React, { useState } from 'react';
import { EmployeeDialogProps } from '../../assets/models/Employes';
import NewEmployeeForm from '../../features/NewEmployeeForm';
import { CreateEmployee } from '../../services/Employes';
import ModalTitle from '../common/ModalTitle';
import { toast } from 'react-toastify';
import { notify } from '../../utils/notify';

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ isOpen, onClose, onEmployeeCreated }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		roleId: '',
		password: '',
	});
	const [passwordError, setPasswordError] = useState('');

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

		if (passwordError) {
			notify(passwordError, 'warning');
			return;
		}

		try {
			const phoneReg = /[0-9]{10}/g;
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

			const response = await CreateEmployee(formData);
			if (!response.ok) {
				console.error(await response.text());
				throw new Error("Erreur lors de la création de l'employé");
			}

			setFormData({
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				roleId: '',
				password: '',
			});

			onEmployeeCreated();
			onClose();
		} catch (error) {
			console.error("Erreur lors de la création de l'employé:", error);
			notify("Une erreur s'est produite.", 'error');
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<ModalTitle title="Créer un employé"></ModalTitle>
				<NewEmployeeForm
					data={formData}
					setData={setFormData}
					isOpen={isOpen}
					onClose={onClose}
					handleSubmit={handleSubmit}></NewEmployeeForm>
			</div>
		</div>
	);
};

export default EmployeeDialog;
