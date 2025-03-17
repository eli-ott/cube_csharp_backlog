import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trash from '../assets/icons/delete.svg';
import refreshIcon from '../assets/icons/refresh.svg';
import { useConfirm } from '../components/common/ConfirmProvider';
import { GetCustomers, DeleteCustomer } from '../services/Customer';
import { Customer as CustomerType } from '../assets/models/Customer';
import CustomerSearchBar from '../components/ui/CustomerSearchBar';

const Customer = () => {
	const navigate = useNavigate();
	const confirm = useConfirm();

	const [refresh, setRefresh] = useState<number>(0);
	const [customer, setCustomer] = useState<CustomerType[]>([]);
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useState(null);

	useEffect(() => {
		const fetchEmployes = async () => {
			let data = await GetCustomers(page, searchParams);

			setPage(data!.currentPage);
			setMaxPage(data!.totalPages);
			setCustomer(data!.items);
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
	 * @param {number} customerId The id of the customer
	 */
	const handleRowClick = (customerId: number) => {
		navigate(`/customers/${customerId}`);
	};

	/**
	 * Delete an customer
	 *
	 * @param {React.MouseEvent} event The event
	 * @param {number} customerId Id of the customer to delete
	 */
	const deleteEmploye = async (event: React.MouseEvent, customerId: number) => {
		event.stopPropagation();

		let confirmRes = await confirm(
			`Êtes vous sur de vouloir supprimer le fournisseur ? Cette action supprime tous les éléments associé à l'utilisateur et est irreversible.`
		);
		if (!confirmRes) return;

		await DeleteCustomer(customerId);
		setRefresh(refresh + 1);
	};

	/**
	 * Logic of the search function
	 */
	const onSearch = (searchParams: any) => {
		setSearchParams(searchParams);
	};

	return (
		<div className="overflow-x-auto p-4 flex flex-col gap-4">
			<div className="actions flex flex-row gap-4">
				<button
					className="h-10 w-10 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
					onClick={() => setRefresh(refresh + 1)}>
					<img src={refreshIcon} alt="refresh icon" />
				</button>
			</div>

			<CustomerSearchBar onSearch={(searchParams) => onSearch(searchParams)} />

			<table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
				<thead>
					<tr className="bg-gray-700 text-white">
						<th className="text-center px-6 py-3 border-b">Id</th>
						<th className="text-center px-6 py-3 border-b">Prénom</th>
						<th className="text-center px-6 py-3 border-b">Nom de famille</th>
						<th className="text-center px-6 py-3 border-b">Email</th>
						<th className="text-center px-6 py-3 border-b">Tel</th>
						<th className="text-center px-6 py-3 border-b">Créé le</th>
						<th className="text-center px-6 py-3 border-b">Mis à jour le</th>
						<th className="text-center px-6 py-3 border-b">Actions</th>
					</tr>
				</thead>

				<tbody>
					{customer.length === 0 ? (
						<tr>
							<td colSpan={9} className="text-center py-6 text-gray-500">
								Aucun client trouvé
							</td>
						</tr>
					) : (
						customer
							.sort((a: CustomerType, b: CustomerType) => a.customerId - b.customerId)
							.map((customer) => (
								<tr
									key={customer.customerId}
									className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition-all cursor-pointer"
									onClick={() => handleRowClick(customer.customerId)}>
									<td className="text-center px-6 py-3 border-b">{customer.customerId}</td>
									<td className="text-center px-6 py-3 border-b">{customer.firstName}</td>
									<td className="text-center px-6 py-3 border-b">{customer.lastName}</td>
									<td className="text-center px-6 py-3 border-b">{customer.email}</td>
									<td className="text-center px-6 py-3 border-b">{customer.phone}</td>
									<td className="text-center px-6 py-3 border-b">
										{new Date(customer.creationTime).toLocaleDateString('fr-FR')}&nbsp;
										{new Date(customer.creationTime).toLocaleTimeString('fr-FR')}
									</td>
									<td className="text-center px-6 py-3 border-b">
										{new Date(customer.updateTime).toLocaleDateString('fr-FR')}&nbsp;
										{new Date(customer.updateTime).toLocaleTimeString('fr-FR')}
									</td>
									<td
										className="flex justify-center items-center px-6 py-3 border-b"
										onClick={(event) => deleteEmploye(event, customer.customerId)}>
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

export default Customer;
