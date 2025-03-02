import React, { useState } from 'react';
import { EmployeeDialogProps } from '../../assets/models/Employes';
import NewEmployeeForm from '../../features/NewEmployeeForm';
import { CreateEmployee } from '../../services/Employes';
import ModalTitle from '../common/ModalTitle';

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

		console.log(formData);
		if (Object.values(formData).some((value) => !value)) {
			alert('Veuillez remplir tous les champs.');
			return;
		}

		if (passwordError) {
			alert(passwordError);
			return;
		}

		try {
			const response = await CreateEmployee(formData);
			console.log(await response.json());

			if (!response.ok) throw new Error("Erreur lors de la création de l'employé");

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
			alert("Une erreur s'est produite.");
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
