import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Customer, customerFields, uselessFields } from '../assets/models/Customer';
import { GetCustomerById } from '../services/Customer';
import { DeleteReview } from '../services/Review';

const CustomerDetail = () => {
	const { id } = useParams();
	const [customer, setCustomer] = useState<Customer | null>(null);
	const [refresh, setRefresh] = useState<number>(0);

	useEffect(() => {
		const fetchCustomer = async () => {
			const response = await GetCustomerById(parseInt(id!));
			setCustomer(response);
		};

		fetchCustomer();
	}, [id, refresh]);

	const deleteReview = async (userId: number, productId: number) => {
		await DeleteReview(userId, productId);

		setRefresh(refresh + 1);
	};

	if (!customer) return <p className="text-center text-gray-500">Chargement...</p>;

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Détail du client</h1>

			{/* Customer Information */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Information générales</h2>
				<div className="grid grid-cols-2 gap-4">
					{Object.entries(customer).map(([key, value]) => {
						if ((typeof value === 'object' && value !== null) || uselessFields.includes(key)) return null;
						return (
							<div key={key} className="bg-gray-100 p-4 rounded-md shadow">
								{/**  @ts-ignore */}
								<p className="text-sm font-medium text-gray-500">{customerFields[key]}</p>

								{key === 'active' ? (
									<p className="text-lg font-semibold">{value ? 'Oui' : 'Non'}</p>
								) : key === 'deletionTime' || key === 'creationTime' || key === 'updateTime' ? (
									<p className="text-lg font-semibold">{value ? new Date(value).toLocaleDateString('fr-FR') : 'Aucune date'}</p>
								) : (
									<p className="text-lg font-semibold">{value}</p>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Address Section */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Adresse</h2>
				<div className="grid grid-cols-2 gap-4">
					{customer.address &&
						Object.entries(customer.address).map(([key, value]) => (
							<div key={key} className="bg-gray-100 p-4 rounded-md shadow">
								{/** @ts-ignore */}
								<p className="text-sm font-medium text-gray-500">{customerFields[key]}</p>
								<p className="text-lg font-semibold">
									{key.toLocaleLowerCase().includes('time') ? (value ? new Date(value).toLocaleDateString('fr-FR') : 'Aucune date') : value}
								</p>
							</div>
						))}
				</div>
			</div>

			{/* Orders Section */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Commandes</h2>
				{customer.orders && customer.orders.length > 0 ? (
					customer.orders.map((order) => (
						<div key={order.orderId} className="bg-gray-100 p-4 rounded-md shadow mb-4">
							<p className="text-sm font-medium text-gray-500">Id</p>
							<p className="text-lg font-semibold">{order.orderId}</p>

							<p className="text-sm font-medium text-gray-500 mt-2">Statut</p>
							<p className="text-lg font-semibold">{order.status.name}</p>

							<p className="text-sm font-medium text-gray-500 mt-2">Date de livraison</p>
							<p className="text-lg font-semibold">{new Date(order.deliveryDate).toLocaleString()}</p>
						</div>
					))
				) : (
					<p>Aucunes commandes.</p>
				)}
			</div>

			{/* Reviews Section */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Avis</h2>
				{customer.reviews && customer.reviews.length > 0 ? (
					customer.reviews.map((review) => (
						<div key={`${review.userId}-${review.productId}`} className="bg-gray-100 p-4 rounded-md shadow">
							<p className="text-sm font-medium text-gray-500">Id</p>
							<p className="text-lg font-semibold">{review.productId}</p>

							<p className="text-sm font-medium text-gray-500 mt-2">Note</p>
							<p className="text-lg font-semibold">{review.rating} / 5</p>

							<p className="text-sm font-medium text-gray-500 mt-2">Commentaire</p>
							<p className="text-lg">{review.comment}</p>
							<div className="flex flex-row justify-end items-center">
								<button
									onClick={() => deleteReview(review.userId, review.productId)}
									className="bg-red-600 text-white p-2 rounded-lg cursor-pointer">
									Supprimer
								</button>
							</div>
						</div>
					))
				) : (
					<p>Aucuns avis pour le moment.</p>
				)}
			</div>
		</div>
	);
};

export default CustomerDetail;
