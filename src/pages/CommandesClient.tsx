import { useEffect, useState } from 'react';
import refreshIcon from '../assets/icons/refresh.svg';
import { Order } from '../assets/models/Customer';
import { GetCommandesClient } from '../services/CommandesClient';
import { useNavigate } from 'react-router-dom';
import { CommandeClient } from '../assets/models/CommandeClient';

const CommandesClient = () => {
	const navigate = useNavigate();
	const [orders, setOrders] = useState<CommandeClient[]>([]);
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [refresh, setRefresh] = useState<number>(1);

	useEffect(() => {
		const fetchOrders = async () => {
			let orders = await GetCommandesClient();

			setPage(orders!.currentPage);
			setMaxPage(orders!.totalPages);
			setOrders(orders!.items);
		};
		fetchOrders();
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
	 * Handle a row click
	 *
	 * @param {number} id The order id
	 */
	const handleRowClick = (id: number) => {
		navigate('/commandes-client/' + id);
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

			<table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
				<thead>
					<tr className="bg-gray-700 text-white">
						<th className="text-center px-6 py-3 border-b">Order ID</th>
						<th className="text-center px-6 py-3 border-b">Customer</th>
						<th className="text-center px-6 py-3 border-b">Delivery Date</th>
						<th className="text-center px-6 py-3 border-b">Status</th>
						<th className="text-center px-6 py-3 border-b">Total Price</th>
					</tr>
				</thead>

				<tbody>
					{orders && orders.length === 0 ? (
						<tr>
							<td colSpan={9} className="text-center py-6 text-gray-500">
								Aucunes commandes trouvées
							</td>
						</tr>
					) : (
						orders
							.sort((a: Order, b: Order) => a.orderId - b.orderId)
							.map((order) => (
								<tr
									key={order.orderId}
									className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition-all cursor-pointer"
									onClick={() => handleRowClick(order.orderId)}>
									<td className="text-center px-6 py-3 border-b">{order.orderId}</td>
									<td className="text-center px-6 py-3 border-b">
										{/** @ts-ignore */}
										{order.customer?.firstName} {order.customer?.lastName}
									</td>
									<td className="text-center px-6 py-3 border-b">{new Date(order.deliveryDate).toLocaleDateString()}</td>
									<td className="text-center px-6 py-3 border-b">{order.status?.name}</td>
									<td className="text-center px-6 py-3 border-b">
										${order.lines?.reduce((total, line) => total + line.unitPrice * line.quantity, 0).toFixed(2)}
									</td>
								</tr>
							))
					)}
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={9} className="px-6 py-4 border-t bg-gray-100">
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

export default CommandesClient;
