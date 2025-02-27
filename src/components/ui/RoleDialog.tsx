import React, { useState } from 'react';
import { RoleDialogProps } from '../../assets/models/Role';

const RoleDialog: React.FC<RoleDialogProps> = ({ isOpen, onClose }) => {
	const apiUrl = process.env.REACT_APP_API_URL;
	const apiKey = process.env.REACT_APP_API_KEY;

	const headers: HeadersInit = {
		'x-api-key': apiKey as string,
		Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
	};

	const [roleName, setRoleName] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoleName(e.target.value);
		setError(''); // Clear error when typing
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!roleName.trim()) {
			setError('Le nom du rôle est requis.');
			return;
		}

		try {
			const response = await fetch(apiUrl + '/roles', {
				// Replace with your API URL
				method: 'POST',
				headers: { 'Content-Type': 'application/json', ...headers },
				body: JSON.stringify({ name: roleName }),
			});

			if (!response.ok) throw new Error('Erreur lors de la création du rôle');

            alert('Rôle créer avec succès');
			setRoleName('');
			onClose();
		} catch (error) {
			console.error('Erreur:', error);
			alert("Une erreur s'est produite.");
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 className="text-xl font-bold mb-4">Créer un Rôle</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="Nom du rôle"
						value={roleName}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>
					{error && <p className="text-red-500 text-sm">{error}</p>}

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

export default RoleDialog;
