import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trash from '../assets/icons/delete.svg';
import refreshIcon from '../assets/icons/refresh.svg';
import { useConfirm } from '../components/common/ConfirmProvider';
import { GetSuppliers, DeleteSupplier } from '../services/Fournisseurs';
import { Supplier } from '../assets/models/Fournisseurs';
import SupplierDialog from '../components/ui/SupplierDialog';
import SupplierSearchBar from '../components/ui/SupplierSearchBar';

const Fournisseurs = () => {
	const navigate = useNavigate();
	const confirm = useConfirm();

	const [refresh, setRefresh] = useState<number>(0);
	const [fournisseurs, setFournisseurs] = useState<Supplier[]>([]);
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [supplierDialogOpen, setSupplierDialogOpen] = useState<boolean>(false);
	const [searchParams, setSearchParams] = useState(null);

	useEffect(() => {
		const fetchEmployes = async () => {
			let data = await GetSuppliers(page, searchParams);

			setPage(data!.currentPage);
			setMaxPage(data!.totalPages);
			setFournisseurs(data!.items);
		};
		fetchEmployes();
	}, [page, refresh, searchParams]);

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

	/**
	 * Handle the click of a row
	 *
	 * @param {number} supplierId The id of the supplier
	 */
	const handleRowClick = (supplierId: number) => {
		navigate(`/fournisseurs/${supplierId}`);
	};

	/**
	 * Delete an supplier
	 *
	 * @param {React.MouseEvent} event The event
	 * @param {number} supplierId Id of the supplier to delete
	 */
	const deleteEmploye = async (event: React.MouseEvent, supplierId: number) => {
		event.stopPropagation();

		let confirmRes = await confirm(
			`Êtes vous sur de vouloir supprimer le fournisseur ? Cette action supprime tous les éléments associé à l'utilisateur et est irreversible.`
		);
		if (!confirmRes) return;

		await DeleteSupplier(supplierId);
		setRefresh(refresh + 1);
	};

	const onSearch = (searchParams: any) => {
		setSearchParams(searchParams);
	}

	return (
		<div className="overflow-x-auto p-4 flex flex-col gap-4">
			<SupplierDialog
				isOpen={supplierDialogOpen}
				onClose={() => setSupplierDialogOpen(false)}
				onSupplierCreated={() => setRefresh(refresh + 1)}></SupplierDialog>

			<div className="actions flex flex-row gap-4">
				<button
					className="h-10 w-10 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
					onClick={() => setRefresh(refresh + 1)}>
					<img src={refreshIcon} alt="refresh icon" />
				</button>
				<button
					className="h-10 w-52 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
					onClick={() => setSupplierDialogOpen(true)}>
					Ajouter un fournisseur
				</button>
			</div>

			<SupplierSearchBar onSearch={(searchParams) => onSearch(searchParams)} />

			<table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
				<thead>
					<tr className="bg-gray-700 text-white">
						<th className="text-center px-6 py-3 border-b">Id</th>
						<th className="text-center px-6 py-3 border-b">Siret</th>
						<th className="text-center px-6 py-3 border-b">Prénom</th>
						<th className="text-center px-6 py-3 border-b">Nom de famille</th>
						<th className="text-center px-6 py-3 border-b">Email</th>
						<th className="text-center px-6 py-3 border-b">Tel</th>
						<th className="text-center px-6 py-3 border-b">Contact</th>
						<th className="text-center px-6 py-3 border-b">Créé le</th>
						<th className="text-center px-6 py-3 border-b">Mis à jour le</th>
						<th className="text-center px-6 py-3 border-b">Actions</th>
					</tr>
				</thead>

				<tbody>
					{fournisseurs.length === 0 ? (
						<tr>
							<td colSpan={9} className="text-center py-6 text-gray-500">
								Aucun fournisseur trouvé
							</td>
						</tr>
					) : (
						fournisseurs
							.sort((a: Supplier, b: Supplier) => a.supplierId - b.supplierId)
							.map((supplier) => (
								<tr
									key={supplier.supplierId}
									className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition-all cursor-pointer"
									onClick={() => handleRowClick(supplier.supplierId)}>
									<td className="text-center px-6 py-3 border-b">{supplier.supplierId}</td>
									<td className="text-center px-6 py-3 border-b">{supplier.siret}</td>
									<td className="text-center px-6 py-3 border-b">{supplier.firstName}</td>
									<td className="text-center px-6 py-3 border-b">{supplier.lastName}</td>
									<td className="text-center px-6 py-3 border-b">{supplier.email}</td>
									<td className="text-center px-6 py-3 border-b">{supplier.phone}</td>
									<td className="text-center px-6 py-3 border-b">{supplier.contact}</td>
									<td className="text-center px-6 py-3 border-b">
										{new Date(supplier.creationTime).toLocaleDateString('fr-FR')}&nbsp;
										{new Date(supplier.creationTime).toLocaleTimeString('fr-FR')}
									</td>
									<td className="text-center px-6 py-3 border-b">
										{new Date(supplier.updateTime).toLocaleDateString('fr-FR')}&nbsp;
										{new Date(supplier.updateTime).toLocaleTimeString('fr-FR')}
									</td>
									<td
										className="flex justify-center items-center px-6 py-3 border-b"
										onClick={(event) => deleteEmploye(event, supplier.supplierId)}>
										<img src={trash} alt="Delete" className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform" />
									</td>
								</tr>
							))
					)}
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={10} className="px-6 py-4 border-t bg-gray-100">
							<div className="flex justify-center gap-4">
								{maxPage && page !== 1 ? (
									<button
										onClick={() => changePage(-1)}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
										Precedent
									</button>
								) : null}
								{maxPage && page !== 1 ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{1}</span> : null}
								<span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{page}</span>
								{maxPage && page !== maxPage ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{maxPage}</span> : null}
								{maxPage && page !== maxPage ? (
									<button
										onClick={() => changePage(1)}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
										Suivant
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

export default Fournisseurs;
