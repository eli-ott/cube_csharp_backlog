import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommandeClient } from '../assets/models/CommandeClient';
import { Status } from '../assets/models/Customer';
import { GetStatus } from '../services/Status';
import ModalSelect from '../components/common/ModalSelect';
import { GetCommandeFournisseurById, UpdateCommandeFournisseur } from '../services/CommandesFournisseur';

const CommandesFournisseurDetail = () => {
	const { id } = useParams();
	const [order, setOrder] = useState<CommandeClient>();
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editableOrder, setEditableOrder] = useState<{ deliveryDate: string; statusId: number }>({
		deliveryDate: order?.deliveryDate ?? '',
		statusId: order?.status.statusId ?? 0,
	});
	const [statuses, setStatuses] = useState<Status[]>();

	useEffect(() => {
		const fetchOrderDetail = async () => {
			const data = await GetCommandeFournisseurById(parseInt(id!));
			const statuses = await GetStatus();

			setLoading(false);
			setOrder(data!);
			setEditableOrder({ deliveryDate: data!.deliveryDate as string, statusId: data!.status.statusId ?? 0 });
			setStatuses(statuses!.items);
		};
		fetchOrderDetail();
	}, [id]);

	const handleChange = (e: any) => {
		setEditableOrder({ ...editableOrder, [e.target.name]: e.target.value });
	};

	const handleSave = async () => {
		const updatedOrder: CommandeClient = {
			...order!,
			deliveryDate: editableOrder.deliveryDate,
			status: statuses!.find((status) => {
				return status.statusId === parseInt(editableOrder.statusId.toString());
			})!,
		};

		await UpdateCommandeFournisseur(updatedOrder);

		setOrder(updatedOrder);
		setIsEditing(false);
	};

	if (loading) return <p>Chargement...</p>;
	if (!order) return <p>Order not found</p>;

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Detail commande</h1>

			{/* Information générales */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Information générales</h2>
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Id commande</p>
						<p className="text-lg font-semibold">{order.orderId}</p>
					</div>
					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Date de livraison</p>
						{isEditing ? (
							<input
								type="date"
								name="deliveryDate"
								value={new Date(editableOrder.deliveryDate).toISOString().substring(0, 10)}
								onChange={handleChange}
								
								className="w-full p-2 border rounded-md"
							/>
						) : (
							<p className="text-lg font-semibold">{new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</p>
						)}
					</div>
					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Statut</p>
						{isEditing ? (
							<ModalSelect
								name="statusId"
								value={editableOrder.statusId.toString()}
								onChange={handleChange}
								options={statuses!}
								optionLabel="name"
								optionValue="statusId"
								required={true}></ModalSelect>
						) : (
							<p className="text-lg font-semibold">{order.status?.name}</p>
						)}
					</div>
				</div>
			</div>

			{/* Customer Information */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Détail du client</h2>
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Nom</p>
						<p className="text-lg font-semibold">
							{order.customer?.firstName} {order.customer?.lastName}
						</p>
					</div>
					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Email</p>
						<p className="text-lg font-semibold">{order.customer?.email}</p>
					</div>
					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Tel</p>
						<p className="text-lg font-semibold">{order.customer?.phone}</p>
					</div>
				</div>
			</div>

			{/* Order Items */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Produits commandés</h2>
				{order.lines.length > 0 ? (
					order.lines.map((line, index) => (
						<div key={index} className="bg-gray-100 p-4 rounded-md shadow mb-4">
							<p className="text-sm font-medium text-gray-500">Produit</p>
							<p className="text-lg font-semibold">{line.product?.name}</p>

							<p className="text-sm font-medium text-gray-500 mt-2">Quantité</p>
							<p className="text-lg font-semibold">{line.quantity}</p>

							<p className="text-sm font-medium text-gray-500 mt-2">Prix unitaire</p>
							<p className="text-lg font-semibold">${line.unitPrice.toFixed(2)}</p>

							<p className="text-sm font-medium text-gray-500 mt-2">Total</p>
							<p className="text-lg font-semibold">${(line.unitPrice * line.quantity).toFixed(2)}</p>
						</div>
					))
				) : (
					<p>Aucun produit dans la commande</p>
				)}
			</div>

			{/* Action Buttons */}
			<div className="flex justify-between mt-6">
				<button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
					{isEditing ? 'Annuler' : 'Modifier'}
				</button>
				{isEditing && (
					<button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md">
						Enregistrer
					</button>
				)}
			</div>
		</div>
	);
};

export default CommandesFournisseurDetail;
