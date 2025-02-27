import React, { useState, useEffect } from 'react';
import { EmployeeDialogProps, RoleCreation } from '../../assets/models/Employes';

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ isOpen, onClose, onEmployeeCreated }) => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const apiKey = process.env.REACT_APP_API_KEY;

	const headers: HeadersInit = {
		'x-api-key': apiKey as string,
		Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
	};

	const [roles, setRoles] = useState<RoleCreation[]>([]);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		roleId: '',
		password: '',
	});
	const [passwordError, setPasswordError] = useState('');

	useEffect(() => {
		if (isOpen) {
			fetchRoles();
		}
	}, [isOpen]);

	const fetchRoles = async () => {
		try {
			const response = await fetch(apiUrl + '/roles', {
				method: 'GET',
				headers,
			});
			const data = await response.json();
			console.log(data.items);
			setRoles(data.items);
		} catch (error) {
			console.error('Error fetching roles:', error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });

		// Validate password in real-time
		if (e.target.name === 'password') {
			validatePassword(e.target.value);
		}
	};

	const validatePassword = (password: string) => {
		const lengthValid = password.length >= 8 && password.length <= 15;
		const upperCaseValid = (password.match(/[A-Z]/g) || []).length >= 2;
		const lowerCaseValid = (password.match(/[a-z]/g) || []).length >= 2;
		const numberValid = (password.match(/[0-9]/g) || []).length >= 2;
		const symbolValid = (password.match(/[\W_]/g) || []).length >= 3; // \W matches non-word characters (symbols)

		if (!lengthValid) {
			setPasswordError('Le mot de passe doit contenir entre 8 et 15 caractères.');
		} else if (!upperCaseValid) {
			setPasswordError('Le mot de passe doit contenir au moins 2 lettres majuscules.');
		} else if (!lowerCaseValid) {
			setPasswordError('Le mot de passe doit contenir au moins 2 lettres minuscules.');
		} else if (!numberValid) {
			setPasswordError('Le mot de passe doit contenir au moins 2 chiffres.');
		} else if (!symbolValid) {
			setPasswordError('Le mot de passe doit contenir au moins 3 symboles.');
		} else {
			setPasswordError('');
		}
	};

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

		if (passwordError) {
			alert(passwordError);
			return;
		}

		try {
			const response = await fetch(apiUrl + '/employees', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
				body: JSON.stringify({
					...formData,
					roleId: Number(formData.roleId),
				}),
			});

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
				<h2 className="text-xl font-bold mb-4">Ajouter un Employé</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						name="firstName"
						type="text"
						placeholder="Prénom"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>
					<input
						name="lastName"
						type="text"
						placeholder="Nom de famille"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>
					<input
						name="email"
						type="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>
					<input
						name="phone"
						type="text"
						placeholder="Téléphone"
						value={formData.phone}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>
					<select name="roleId" value={formData.roleId} onChange={handleChange} className="w-full p-2 border rounded-md" required>
						<option value="">Sélectionner un rôle</option>
						{roles.map((role) => (
							<option key={role.roleId} value={role.roleId}>
								{role.name}
							</option>
						))}
					</select>
					<div>
						<input
							name="password"
							type="password"
							placeholder="Mot de passe"
							value={formData.password}
							onChange={handleChange}
							className="w-full p-2 border rounded-md"
							required
						/>
						{passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
					</div>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="h-10 w-52 bg-gray-100 text-black font-medium rounded-md shadow-md hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
							Annuler
						</button>
						<button
							type="submit"
							className="h-10 w-52 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer">
							Créer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EmployeeDialog;
