import { useEffect, useState } from 'react';
import { Family } from '../assets/models/Product';
import trash from '../assets/icons/delete.svg';
import refreshIcon from '../assets/icons/refresh.svg';
import { useConfirm } from '../components/common/ConfirmProvider';
import { GetFamilies, UpdateFamilies, DeleteFamilies } from '../services/Family';
import FamilyDialog from '../components/ui/FamilyDialog';
import { notify } from '../utils/notify';

const FamilyTable = () => {
	const confirm = useConfirm();

	const [refresh, setRefresh] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [families, setFamilies] = useState<Family[]>([]);

	useEffect(() => {
		const fetchFamilies = async () => {
			const data = await GetFamilies();
			setFamilies(data!.items);
			setMaxPage(data!.totalPages);
		};
		fetchFamilies();
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

	const deleteFamily = async (event: React.MouseEvent, familyId: number) => {
		event.stopPropagation();

		const confirmRes = await confirm('Êtes-vous sûr de vouloir supprimer cette famille ?');
		if (!confirmRes) return;

		await DeleteFamilies(familyId);
		setRefresh(refresh + 1);
	};

	// Mise à jour de la famille
	const updateFamily = async (familyId: number, newName: string) => {
		if (newName && newName.trim() !== '') {
			await UpdateFamilies(familyId, newName);
			setRefresh(refresh + 1);
			notify('Mis à jour !', 'success');
		} else {
			notify('Le nom ne peut pas être vide', 'info');
		}
	};

	return (
		<div className="overflow-x-auto p-4 flex flex-col gap-4">
			<div className="actions flex flex-row gap-4">
				<FamilyDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} onFamilyCreated={() => setRefresh(refresh + 1)} />
				<button
					className="h-10 w-10 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800"
					onClick={() => setRefresh(refresh + 1)}>
					<img src={refreshIcon} alt="refresh icon" />
				</button>
				<button
					className="h-10 w-52 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800"
					onClick={() => setDialogOpen(true)}>
					Ajouter une famille
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
					{families.length === 0 ? (
						<tr>
							<td colSpan={3} className="text-center py-6 text-gray-500">
								Aucune famille trouvée
							</td>
						</tr>
					) : (
						families.map((family) => (
							<tr key={family.familyId} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
								<td className="text-center px-6 py-3 border-b">{family.familyId}</td>
								<td className="text-center px-6 py-3 border-b">
									<input type="text" defaultValue={family.name} className="border p-1 rounded" id={`family-${family.familyId}`} />
								</td>
								<td className="text-center px-6 py-3 border-b">
									<button className="mr-2" onClick={(event) => deleteFamily(event, family.familyId)}>
										<img src={trash} alt="Supprimer" className="w-6 h-6 hover:scale-110" />
									</button>
									<button
										onClick={() => {
											// Récupérer la nouvelle valeur du champ input et mettre à jour
											const newName = (document.getElementById(`family-${family.familyId}`) as HTMLInputElement).value;
											updateFamily(family.familyId, newName);
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
								{maxPage && page !== 1 ? (
									<button
										onClick={() => changePage(-1)}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
										Prev
									</button>
								) : null}
								{maxPage && page !== 1 ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{1}</span> : null}
								<span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{page}</span>
								{maxPage && page !== maxPage ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{maxPage}</span> : null}
								{maxPage && page !== maxPage ? (
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

export default FamilyTable;
