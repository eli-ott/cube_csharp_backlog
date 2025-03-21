import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee, Role } from '../assets/models/Employes';
import { GetEmployeById, SaveEmploye } from '../services/Employes';
import { GetRoles } from '../services/Roles';
import { notify } from '../utils/notify';

const EmployeeDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>(); // Get employee ID from URL
	const navigate = useNavigate();
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [roles, setRoles] = useState<Role[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		fetchEmployee();
		fetchRoles();
	}, [id]);

	const fetchEmployee = async () => {
		setLoading(true);
		setEmployee(await GetEmployeById(parseInt(id!)));
		setLoading(false);
	};

	const fetchRoles = async () => {
		setRoles((await GetRoles())?.items as Role[]);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		if (!employee) return;
		let newValue, newKey;
		if (e.target.name === 'roleId') {
			newValue = roles.find((role) => role.roleId === parseInt(e.target.value));
			newKey = 'role';
		} else {
			newValue = e.target.value;
			newKey = e.target.name;
		}

		setEmployee({ ...employee, [newKey]: newValue });
	};

	const handleSave = async () => {
		if (!employee || !id) {
			notify('Employée ou ID introuvable', 'warning');
			return;
		}

		let saveEmployee = await SaveEmploye(employee, parseInt(id));

		if (!saveEmployee) {
			setError("Erreur lors de la sauvegarde de l'employé");
			return;
		}

		notify('Employee updated successfully!', 'success');
		setIsEditing(false);
		fetchEmployee();
	};

	if (loading) return <p className="text-center mt-4">Chargement...</p>;
	if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;
	if (!employee) return <p className="text-center text-gray-500 mt-4">Impossible de trouver l'employé</p>;

	return (
		<div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4 text-center">Détail de l'employé</h2>

			<div className="grid grid-cols-2 gap-6">
				{/* Employee ID */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Id employé</p>
					<p className="text-lg font-semibold">{employee.employeeId}</p>
				</div>

				{/* First Name */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Nom de famille</p>
					{isEditing ? (
						<input
							type="text"
							name="firstName"
							value={employee.firstName}
							onChange={handleChange}
							className="w-full p-2 border rounded-md"
						/>
					) : (
						<p className="text-lg font-semibold">{employee.firstName}</p>
					)}
				</div>

				{/* Last Name */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Prénom</p>
					{isEditing ? (
						<input type="text" name="lastName" value={employee.lastName} onChange={handleChange} className="w-full p-2 border rounded-md" />
					) : (
						<p className="text-lg font-semibold">{employee.lastName}</p>
					)}
				</div>

				{/* Email */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Email</p>
					{isEditing ? (
						<input type="email" name="email" value={employee.email} onChange={handleChange} className="w-full p-2 border rounded-md" />
					) : (
						<p className="text-lg font-semibold">{employee.email}</p>
					)}
				</div>

				{/* Phone */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Tel</p>
					{isEditing ? (
						<input type="text" name="phone" value={employee.phone} onChange={handleChange} className="w-full p-2 border rounded-md" />
					) : (
						<p className="text-lg font-semibold">{employee.phone}</p>
					)}
				</div>

				{/* Role */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Fonction</p>
					{isEditing ? (
						<select name="roleId" value={employee.role.roleId} onChange={handleChange} className="w-full p-2 border rounded-md">
							{roles.map((role) => (
								<option key={role.roleId} value={role.roleId}>
									{role.name}
								</option>
							))}
						</select>
					) : (
						<p className="text-lg font-semibold">{employee.role.name}</p>
					)}
				</div>

				{/* Creation Time */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Date de création</p>
					<p className="text-lg font-semibold">
						{new Date(employee.creationTime).toLocaleDateString('fr-FR')}&nbsp;
						{new Date(employee.creationTime).toLocaleTimeString('fr-FR')}
					</p>
				</div>

				{/* Update Time */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Date de mise à jour</p>
					<p className="text-lg font-semibold">
						{new Date(employee.updateTime).toLocaleDateString('fr-FR')}&nbsp;
						{new Date(employee.creationTime).toLocaleTimeString('fr-FR')}
					</p>
				</div>

				{/* Deletion Time */}
				<div className="bg-gray-100 p-4 rounded-md shadow">
					<p className="text-sm font-medium text-gray-500">Date de suppression</p>
					{employee.deletionTime ? (
						<p className="text-lg font-semibold">
							{new Date(employee.deletionTime).toLocaleDateString('fr-FR')}
							{new Date(employee.creationTime).toLocaleTimeString('fr-FR')}
						</p>
					) : (
						<p className="text-lg font-semibold">Employé actif</p>
					)}
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-between mt-6">
				<button onClick={() => navigate('/employes')} className="px-4 py-2 bg-gray-500 text-white rounded-md">
					Retour
				</button>

				{isEditing ? (
					<button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md">
						Enregistrer
					</button>
				) : (
					<button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
						Modifier
					</button>
				)}
			</div>
		</div>
	);
};

export default EmployeeDetails;
