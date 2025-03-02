import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { modifiableFields, NewSupplierFormData, Supplier, supplierFields } from '../assets/models/Fournisseurs';
import { GetSupplierById, SaveSupplier } from '../services/Fournisseurs';
import { toast } from 'react-toastify';

const SupplierDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [supplier, setSupplier] = useState<Supplier | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [refresh, setRefresh] = useState(1);
	const [formData, setFormData] = useState<Supplier | null>(null);

	useEffect(() => {
		const fetchSupplier = async () => {
			try {
				const data = await GetSupplierById(parseInt(id!));

				setSupplier(data);
				setFormData(data);
			} catch (error) {
				console.error('Error fetching supplier:', error);
			}
		};

		fetchSupplier();
	}, [id, refresh]);

	const handleInputChange = (e: any) => {
		const addressFields = ['addressLine', 'city', 'zipCode', 'country', 'complement'];
		let newData;
		if (addressFields.includes(e.target.name)) {
			newData = {
				...formData,
				address: {
					...formData!.address,
					[e.target.name]: e.target.value!,
				},
			};
		} else {
			newData = { ...formData, [e.target.name]: e.target.value! };
		}

		setSupplier(newData as Supplier);
		setFormData(supplier);
	};

	const handleSave = async () => {
		try {
			const data = await SaveSupplier(supplier!, parseInt(id!));

			if (!data) toast.error('Erreur lors de la sauvegarde du fournisseur');

			toast.success('Fournisseur enregistré avec succès');
			setRefresh(refresh + 1);
			setIsEditing(false);
		} catch (error) {
			console.error('Error updating supplier:', error);
		}
	};

	if (!supplier) return <p>Loading...</p>;

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Détail du fournisseur</h1>

			{/* Supplier Information */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Informations</h2>
				<div className="grid grid-cols-2 gap-4">
					{Object.entries(formData!).map(([key, value]) => {
						if (typeof value === 'object' && value !== null) return null;
						return (
							<div key={key} className="bg-gray-100 p-4 rounded-md shadow">
								{/** @ts-ignore */}
								<p className="text-sm font-medium text-gray-500">{supplierFields[key]}</p>
								{isEditing && modifiableFields.includes(key) ? (
									<input type="text" name={key} value={value} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
								) : (
									<p className="text-lg font-semibold">{value ?? 'Aucune valeur'}</p>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Address Section */}
			<div className="border rounded-lg p-4 mb-6 bg-gray-50">
				<h2 className="text-xl font-semibold mb-4">Adresse</h2>
				<div className="grid grid-cols-2 gap-4">
					{supplier.address &&
						Object.entries(supplier.address).map(([key, value]) => (
							<div key={key} className="bg-gray-100 p-4 rounded-md shadow">
								{/** @ts-ignore */}
								<p className="text-sm font-medium text-gray-500">{supplierFields[key]}</p>
								{isEditing && modifiableFields.includes(key) ? (
									<input type="text" name={key} value={value} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
								) : (
									<p className="text-lg font-semibold">{value ?? 'Aucune valeur'}</p>
								)}
							</div>
						))}
				</div>
			</div>

			{/* Product List */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Produits créés par l'utilisateur</h2>
				{supplier.products && supplier.products.length > 0 ? (
					<div className="grid grid-cols-3 gap-4">
						{supplier.products.map((product) => (
							<div
								key={product.productId}
								className="border rounded-lg p-4 w-75 shadow-md cursor-pointer"
								onClick={() => navigate(`/products/${product.productId}`)}>
								<h3 className="font-bold text-lg">{product.name}</h3>
								<div className="grid grid-cols-1 gap-2">
									<div className="bg-gray-100 p-4 rounded-md shadow">
										<p className="text-sm font-medium text-gray-500">Cuvée</p>
										<p className="text-lg font-semibold">{product.cuvee}</p>
									</div>
									<div className="bg-gray-100 p-4 rounded-md shadow">
										<p className="text-sm font-medium text-gray-500">Année</p>
										<p className="text-lg font-semibold">{product.year}</p>
									</div>
									<div className="bg-gray-100 p-4 rounded-md shadow">
										<p className="text-sm font-medium text-gray-500">Producteur</p>
										<p className="text-lg font-semibold">{product.producerName}</p>
									</div>
									<div className="bg-gray-100 p-4 rounded-md shadow">
										<p className="text-sm font-medium text-gray-500">Quantité</p>
										<p className="text-lg font-semibold">{product.quantity}</p>
									</div>
									<div className="bg-gray-100 p-4 rounded-md shadow">
										<p className="text-sm font-medium text-gray-500">Restock automatique</p>
										<p className="text-lg font-semibold">{product.autoRestock ? 'Yes' : 'No'}</p>
									</div>
								</div>

								{/* Product Images */}
								<div className="flex gap-2 mt-4">
									{product.images?.map((image) => (
										<img key={image.imageId} src={image.imageUrl} alt="Product" className="w-16 h-16 object-cover rounded" />
									))}
								</div>
							</div>
						))}
					</div>
				) : (
					<p>No products available</p>
				)}
			</div>

			{/* Action Buttons */}
			<div className="flex mt-6 gap-4 justify-between">
				<button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white px-4 py-2 rounded">
					{isEditing ? 'Cancel' : 'Edit'}
				</button>
				{isEditing && (
					<button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
						Save
					</button>
				)}
			</div>
		</div>
	);
};

export default SupplierDetail;
