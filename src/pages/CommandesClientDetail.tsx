import React, { useState, useEffect } from 'react';
import { Customer, customerFields, Order } from '../assets/models/Customer';
import { GetCommandeClientById } from '../services/CommandesClient';
import { CommandeClient } from '../assets/models/CommandeClient';
import { useParams } from 'react-router-dom';

const CommandesClientDetail = () => {
	const { id } = useParams();
	const [order, setOrder] = useState<CommandeClient>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrderDetail = async () => {
			const data = await GetCommandeClientById(parseInt(id!));

			setLoading(false);
			setOrder(data!);
		};
		fetchOrderDetail();
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (!order) return <p>Order not found</p>;

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Order Details</h1>

            {/* General Information */}
            <div className="border rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">General Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-md shadow">
                        <p className="text-sm font-medium text-gray-500">Order ID</p>
                        <p className="text-lg font-semibold">{order.orderId}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md shadow">
                        <p className="text-sm font-medium text-gray-500">Delivery Date</p>
                        <p className="text-lg font-semibold">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md shadow">
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className="text-lg font-semibold">{order.status?.name}</p>
                    </div>
                </div>
            </div>

            {/* Customer Information */}
            <div className="border rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-md shadow">
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="text-lg font-semibold">{order.customer?.firstName} {order.customer?.lastName}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md shadow">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-lg font-semibold">{order.customer?.email}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md shadow">
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-lg font-semibold">{order.customer?.phone}</p>
                    </div>
                </div>
            </div>

            {/* Address Section */}
            <div className="border rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Address</h2>
                <div className="grid grid-cols-2 gap-4">
                    {order.customer?.address &&
                        Object.entries(order.customer.address).map(([key, value]) => (
                            <div key={key} className="bg-gray-100 p-4 rounded-md shadow">
                                {/**  @ts-ignore */}
                                <p className="text-sm font-medium text-gray-500">{customerFields[key]}</p>
                                <p className="text-lg font-semibold">{value}</p>
                            </div>
                        ))}
                </div>
            </div>

            {/* Order Items */}
            <div className="border rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
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
                    <p>No items in this order.</p>
                )}
            </div>
        </div>
	);
};

export default CommandesClientDetail;
