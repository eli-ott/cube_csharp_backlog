import { useEffect, useState } from 'react';
import { Employee } from '../assets/models/Employes';
import { useNavigate } from 'react-router-dom';

const Employes = () => {
	const navigate = useNavigate();

	const [employes, setEmployes] = useState<Employee[]>([]);
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);

	useEffect(() => {
		const apiUrl = process.env.REACT_APP_API_URL;
		const apiKey = process.env.REACT_APP_API_KEY;

		const fetchEmployes = async () => {
			const headers: HeadersInit = {
				'x-api-key': apiKey as string,
				Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
			};

			const employesRes = await fetch(apiUrl + `/employees?page=${page}`, {
				method: 'GET',
				headers,
			});
			const data = await employesRes.json();

			setPage(data.currentPage);
			setMaxPage(data.totalPages);
			setEmployes(data.items);
		};
		fetchEmployes();
	}, [page]);

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
	return (
		<div className="overflow-x-auto p-4">
            Ajouter des boutons pour créer un nouvea employe
            <br />Ajouter les actions dans le tableau (+ appel api);
            <br />Ajouter bouton pour créer un nouveau rôle ???
			<table className="min-w-full table-auto border-collapse">
				<thead>
					<tr className="bg-gray-300">
						<th className="px-4 py-2 text-left border-b">Id</th>
						<th className="px-4 py-2 text-left border-b">Prénom</th>
						<th className="px-4 py-2 text-left border-b">Nom de famille</th>
						<th className="px-4 py-2 text-left border-b">Email</th>
						<th className="px-4 py-2 text-left border-b">Tel</th>
						<th className="px-4 py-2 text-left border-b">Poste</th>
						<th className="px-4 py-2 text-left border-b">Créé le</th>
						<th className="px-4 py-2 text-left border-b">Mis à jour le</th>
					</tr>
				</thead>

				<tbody>
					{employes.length === 0 ? (
						<tr>
							<td colSpan={8} className="text-center py-4 text-gray-500">
								Aucun employés
							</td>
						</tr>
					) : (
						employes
							.sort((a: Employee, b: Employee) => a.employeeId - b.employeeId)
							.map((employee) => (
								<tr
									key={employee.employeeId}
									className="hover:bg-gray-200 odd:bg-gray-100"
									onClick={() => handleRowClick(employee.employeeId)}>
									<td className="px-4 py-2 border-b">{employee.employeeId}</td>
									<td className="px-4 py-2 border-b">{employee.firstName}</td>
									<td className="px-4 py-2 border-b">{employee.lastName}</td>
									<td className="px-4 py-2 border-b">{employee.email}</td>
									<td className="px-4 py-2 border-b">{employee.phone}</td>
									<td className="px-4 py-2 border-b">{employee.role.name}</td>
									<td className="px-4 py-2 border-b">{employee.creationTime}</td>
									<td className="px-4 py-2 border-b">{employee.updateTime}</td>
								</tr>
							))
					)}
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={8} className="px-4 py-2 text-left border-b">
							<div className="flex flex-row justify-center gap-5">
								<span onClick={() => changePage(-1)} className="cursor-pointer text-blue-500 hover:underline">
									Prev
								</span>
								<span onClick={() => setPage(1)} className="cursor-pointer text-blue-500 hover:underline">
									1
								</span>
								<span className="font-bold">{page}</span>
								<span onClick={() => setPage(maxPage)} className="cursor-pointer text-blue-500 hover:underline">
									{maxPage}
								</span>
								<span onClick={() => changePage(1)} className="cursor-pointer text-blue-500 hover:underline">
									Next
								</span>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default Employes;
