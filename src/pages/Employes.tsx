import { useEffect, useState } from 'react';
import { Employee } from '../assets/models/Employes';
import { Link, useNavigate } from 'react-router-dom';
import trash from '../assets/icons/delete.svg';
import refreshIcon from '../assets/icons/refresh.svg';
import { useConfirm } from '../components/common/ConfirmProvider';

const Employes = () => {
	const navigate = useNavigate();
	const confirm = useConfirm();

	const apiUrl = process.env.REACT_APP_API_URL;
	const apiKey = process.env.REACT_APP_API_KEY;

	const [refresh, setRefresh] = useState<number>(0);
	const [employes, setEmployes] = useState<Employee[]>([]);
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);

	useEffect(() => {
		const fetchEmployes = async () => {
			const headers: HeadersInit = {
				'x-api-key': apiKey as string,
				Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
			};

			let data;
			try {
				const employesRes = await fetch(apiUrl + `/employees?page=${page}`, {
					method: 'GET',
					headers,
				});
				data = await employesRes.json();
			} catch (e) {
				console.error(e);
			}

			setPage(data.currentPage);
			setMaxPage(data.totalPages);
			setEmployes(data.items);
		};
		fetchEmployes();
	}, [page, refresh]);

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
	 * @param {number} employeeId The id of the employee
	 */
	const handleRowClick = (employeeId: number) => {
		navigate(`/employe/${employeeId}`);
	};

	/**
	 * Delete an employee
	 *
	 * @param {React.MouseEvent} event The event
	 * @param {number} employeeId Id of the employee to delete
	 */
	const deleteEmploye = async (event: React.MouseEvent, employeeId: number) => {
		event.stopPropagation();

		let confirmRes = await confirm(
			`Êtes vous sur de vouloir supprimer l'employee ? Cette action supprime tous les éléments associé à l'utilisateur et est irreversible.`
		);
		if (!confirmRes) return;

		const headers: HeadersInit = {
			'x-api-key': apiKey as string,
			Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
		};

		try {
			const deleteEmployeRes = await fetch(apiUrl + `/employees/${employeeId}`, {
				method: 'DELETE',
				headers,
			});

			setRefresh(refresh + 1);
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<div className="overflow-x-auto p-4 flex flex-col gap-4">
			<div className="actions flex flex-row gap-4">
				<button
					className="h-10 w-10 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all"
					onClick={() => setRefresh(refresh + 1)}>
					<img src={refreshIcon} alt="refresh icon" />
				</button>
				<button className="h-10 w-52 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all">
					Ajouter un employé
				</button>
			</div>
			<table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
				<thead>
					<tr className="bg-gray-700 text-white">
						<th className="text-center px-6 py-3 border-b">Id</th>
						<th className="text-center px-6 py-3 border-b">Prénom</th>
						<th className="text-center px-6 py-3 border-b">Nom de famille</th>
						<th className="text-center px-6 py-3 border-b">Email</th>
						<th className="text-center px-6 py-3 border-b">Tel</th>
						<th className="text-center px-6 py-3 border-b">Poste</th>
						<th className="text-center px-6 py-3 border-b">Créé le</th>
						<th className="text-center px-6 py-3 border-b">Mis à jour le</th>
						<th className="text-center px-6 py-3 border-b">Actions</th>
					</tr>
				</thead>

				<tbody>
					{employes.length === 0 ? (
						<tr>
							<td colSpan={9} className="text-center py-6 text-gray-500">
								Aucun employé trouvé
							</td>
						</tr>
					) : (
						employes
							.sort((a: Employee, b: Employee) => a.employeeId - b.employeeId)
							.map((employee) => (
								<tr
									key={employee.employeeId}
									className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition-all cursor-pointer"
									onClick={() => handleRowClick(employee.employeeId)}>
									<td className="text-center px-6 py-3 border-b">{employee.employeeId}</td>
									<td className="text-center px-6 py-3 border-b">{employee.firstName}</td>
									<td className="text-center px-6 py-3 border-b">{employee.lastName}</td>
									<td className="text-center px-6 py-3 border-b">{employee.email}</td>
									<td className="text-center px-6 py-3 border-b">{employee.phone}</td>
									<td className="text-center px-6 py-3 border-b">{employee.role.name}</td>
									<td className="text-center px-6 py-3 border-b">{employee.creationTime}</td>
									<td className="text-center px-6 py-3 border-b">{employee.updateTime}</td>
									<td className="text-center px-6 py-3 border-b" onClick={(event) => deleteEmploye(event, employee.employeeId)}>
										<img src={trash} alt="Delete" className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform" />
									</td>
								</tr>
							))
					)}
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={9} className="px-6 py-4 border-t bg-gray-100">
							<div className="flex justify-center gap-4">
								<button
									onClick={() => changePage(-1)}
									className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
									Prev
								</button>
								{page !== 1 ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{1}</span> : null}
								<span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{page}</span>
								{page !== maxPage ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{maxPage}</span> : null}
								<button
									onClick={() => changePage(1)}
									className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
									Next
								</button>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default Employes;
