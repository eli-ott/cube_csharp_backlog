import { useEffect, useState } from 'react';
import { Role } from '../assets/models/Employes';
import { useNavigate } from 'react-router-dom';
import trash from '../assets/icons/delete.svg';
import refreshIcon from '../assets/icons/refresh.svg';
import { useConfirm } from '../components/common/ConfirmProvider';
import { GetRoles, AddRole, UpdateRole, DeleteRole } from '../services/Roles';
import RoleDialog from '../components/ui/RoleDialog';
import { notify } from '../utils/notify';

const Roles = () => {
	const navigate = useNavigate();
	const confirm = useConfirm();

	const [refresh, setRefresh] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [roles, setRoles] = useState<Role[]>([]);

	useEffect(() => {
		const fetchRoles = async () => {
			const data = await GetRoles();
			if (data) setRoles(data.items);
		};
		fetchRoles();
	}, [refresh]);

	/**
	 * Change the current page
	 *
	 * @param {number} direction If number is negative then -1 to the current page otherwise +1
	 */
	const changePage = (direction: number) => {
		let newPage: number = direction < 0 ? page - 1 : page + 1;

		if (newPage === 0 || newPage > maxPage) return;

		setPage(newPage);
	};

	const deleteRole = async (event: React.MouseEvent, roleId: number) => {
		event.stopPropagation();

		const confirmRes = await confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?');
		if (!confirmRes) return;

		await DeleteRole(roleId);
		setRefresh(refresh + 1);
	};

	const addRole = async () => {
		const name = prompt('Nom du nouveau rôle :');
		if (name) {
			await AddRole(name);
			setRefresh(refresh + 1);
		}
	};

	// Mise à jour du rôle
	const updateRole = async (roleId: number, newName: string) => {
		if (newName && newName.trim() !== '') {
			await UpdateRole(roleId, newName);
			setRefresh(refresh + 1);
			notify('Mis à jour !', 'success'); // Rafraîchir la liste après la mise à jour
		} else {
			alert('Le nom ne peut pas être vide');
		}
	};

	return (
		<div className="overflow-x-auto p-4 flex flex-col gap-4">
			<div className="actions flex flex-row gap-4">
				<RoleDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} onRoleCreated={() => setRefresh(refresh + 1)} />
				<button
					className="h-10 w-10 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800"
					onClick={() => setRefresh(refresh + 1)}>
					<img src={refreshIcon} alt="refresh icon" />
				</button>
				<button
					className="h-10 w-52 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800"
					onClick={() => setDialogOpen(true)}>
					Ajouter un rôle
				</button>
			</div>

			<table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
				<thead>
					<tr className="bg-gray-700 text-white">
						<th className="text-center px-6 py-3 border-b">Id</th>
						<th className="text-center px-6 py-3 border-b">Nom</th>
						<th className="text-center px-6 py-3 border-b">Actions</th>
					</tr>
				</thead>

				<tbody>
					{roles.length === 0 ? (
						<tr>
							<td colSpan={3} className="text-center py-6 text-gray-500">
								Aucun rôle trouvé
							</td>
						</tr>
					) : (
						roles.map((role) => (
							<tr key={role.roleId} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
								<td className="text-center px-6 py-3 border-b">{role.roleId}</td>
								<td className="text-center px-6 py-3 border-b">
									<input type="text" defaultValue={role.name} className="border p-1 rounded" id={`role-${role.roleId}`} />
								</td>
								<td className="text-center px-6 py-3 border-b">
									<button className="mr-2" onClick={(event) => deleteRole(event, role.roleId)}>
										<img src={trash} alt="Supprimer" className="w-6 h-6 hover:scale-110" />
									</button>
									<button
										onClick={() => {
											// Récupérer la nouvelle valeur du champ input et mettre à jour
											const newName = (document.getElementById(`role-${role.roleId}`) as HTMLInputElement).value;
											updateRole(role.roleId, newName);
										}}
										className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">
										Modifier
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={3} className="px-6 py-4 border-t bg-gray-100">
							<div className="flex justify-center gap-4">
								{page !== 1 ? (
									<button
										onClick={() => changePage(-1)}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
										Prev
									</button>
								) : null}
								{page !== 1 ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{1}</span> : null}
								<span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{page}</span>
								{page !== maxPage ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{maxPage}</span> : null}
								{page !== maxPage ? (
									<button
										onClick={() => changePage(1)}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
										Next
									</button>
								) : null}
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default Roles;
