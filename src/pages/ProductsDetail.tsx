import React, { useState, useEffect } from 'react';
import { Product } from '../assets/models/Product';
import { useParams } from 'react-router-dom';
import { GetProductById, UpdateProduct } from '../services/Products';
import { DeleteImage } from '../services/Images';
import DiscountDialog from '../components/ui/DiscountDialog';
import { DeleteDiscount } from '../services/Discount';
import { toast } from 'react-toastify';
import { DeleteReview } from '../services/Review';

const ProductDetail = () => {
	const { id } = useParams();

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editableProduct, setEditableProduct] = useState<Product | null>(null);
	const [discountDialogOpen, setDiscountDialogOpen] = useState<boolean>(false);
	const [newImages, setNewImages] = useState<File[]>([]);
	const [refresh, setRefresh] = useState<number>(0);

	useEffect(() => {
		const fetchProductDetail = async () => {
			const data = await GetProductById(parseInt(id!));
			setProduct(data);
			setEditableProduct(data);
			setLoading(false);
		};
		fetchProductDetail();
	}, [id, refresh]);

	// @ts-ignore
	const handleChange = (e) => {
		// @ts-ignore
		setEditableProduct({ ...editableProduct, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e: any) => {
		//@ts-ignore
		setNewImages(Array.from(e.target.files));
	};

	const handleSave = async () => {
		const productData = new FormData();

		//@ts-ignore
		if (5 - product?.images.length < newImages.length) {
			toast.error('Vous pouvez ajouter 5 images au maximum');
			return;
		}

		Object.keys(editableProduct!).forEach((key) => {
			if (key === 'images' && newImages && newImages.length > 0) {
				newImages!.forEach((file: File) => {
					if (file.size > 5000000) {
						toast.error('Un des fichier est trop volumineux');
						return;
					}

					productData.append('images', file);
				});
			} else {
				//@ts-ignore
				if (editableProduct[key] != null) {
					//@ts-ignore
					productData.append(key, editableProduct[key]);
				}
			}
		});
		productData.append('supplierId', editableProduct!.supplier.supplierId.toString());
		productData.append('familyId', editableProduct!.family.familyId.toString());

		const data = await UpdateProduct(productData);
		setRefresh(refresh + 1);
		setIsEditing(false);
	};

	const handleDeleteImage = async (imageId: string) => {
		const res = await DeleteImage(imageId);

		setRefresh(refresh + 1);
	};

	const deleteDiscount = async () => {
		const response = await DeleteDiscount(product?.discount.discountId);

		setRefresh(refresh + 1);
	};

	const deleteReview = async (userId: number) => {
		const response = await DeleteReview(userId, product?.productId!);

		setRefresh(refresh + 1);
	};

	if (loading) return <p>Loading...</p>;
	if (!product) return <p>Product not found</p>;

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
			<DiscountDialog
				productId={product.productId}
				isOpen={discountDialogOpen}
				onClose={() => setDiscountDialogOpen(false)}
				onDiscountCreated={() => setRefresh(refresh + 1)}
			/>

			<h1 className="text-3xl font-bold mb-6">Product Details</h1>
			{/* General Information */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold">Information générales</h2>

				<div className="grid grid-cols-2 gap-4">
					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Nom</p>
						{isEditing ? (
							<input
								type="text"
								name="name"
								className="text-lg font-semibold w-full bg-white"
								value={editableProduct!.name}
								onChange={(e) => handleChange(e)}
							/>
						) : (
							<p className="text-lg font-semibold">{product.name}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Description</p>
						{isEditing ? (
							<input
								type="text"
								name="description"
								className="text-lg font-semibold w-full bg-white"
								value={editableProduct!.description}
								onChange={(e) => handleChange(e)}
							/>
						) : (
							<p className="text-lg font-semibold">{product.description}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Cuvée</p>
						{isEditing ? (
							<input
								type="text"
								name="cuvee"
								className="text-lg font-semibold w-full bg-white"
								value={editableProduct!.cuvee}
								onChange={(e) => handleChange(e)}
							/>
						) : (
							<p className="text-lg font-semibold">{product.cuvee}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Année</p>
						{isEditing ? (
							<input
								type="number"
								name="year"
								className="text-lg font-semibold w-full bg-white"
								value={editableProduct!.year}
								onChange={(e) => handleChange(e)}
							/>
						) : (
							<p className="text-lg font-semibold">{product.year}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Producteur</p>
						{isEditing ? (
							<input
								type="text"
								name="producerName"
								className="text-lg font-semibold w-full bg-white"
								value={editableProduct!.producerName}
								onChange={(e) => handleChange(e)}
							/>
						) : (
							<p className="text-lg font-semibold">{product.producerName}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Bio</p>
						{isEditing ? (
							<select
								className="text-lg font-semibold w-full bg-white"
								name="isBio"
								value={editableProduct!.isBio ? 'Oui' : 'Non'}
								onChange={(e) => handleChange(e)}>
								<option value="true">Oui</option>
								<option value="false">Non</option>
							</select>
						) : (
							<p className="text-lg font-semibold">{product.isBio ? 'Oui' : 'Non'}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Prix unitaire</p>
						{isEditing ? (
							<input
								type="number"
								name="unitPrice"
								className="text-lg font-semibold w-full bg-white"
								value={editableProduct!.unitPrice || ''}
								onChange={(e) => handleChange(e)}
							/>
						) : (
							<p className="text-lg font-semibold">{product.unitPrice ? `${product.unitPrice}€` : 'Aucun prix unitaire'}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Quantité</p>
						{isEditing ? (
							<input
								type="number"
								name="quantity"
								className="text-lg font-semibold w-full bg-white"
								value={editableProduct!.quantity}
								onChange={(e) => handleChange(e)}
							/>
						) : (
							<p className="text-lg font-semibold">{product.quantity}</p>
						)}
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Date de création</p>
						<p className="text-lg font-semibold">
							{product.creationTime ? new Date(product.creationTime).toLocaleDateString('fr-FR') : null}
						</p>
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Date de mise à jour</p>
						<p className="text-lg font-semibold">{product.updateTime ? new Date(product.updateTime).toLocaleDateString('fr-FR') : null}</p>
					</div>

					<div className="bg-gray-100 p-4 rounded-md shadow">
						<p className="text-sm font-medium text-gray-500">Date de suppression</p>
						<p className="text-lg font-semibold">
							{product.deletionTime ? new Date(product.deletionTime).toLocaleDateString('fr-FR') : 'Pas supprimé'}
						</p>
					</div>

					{isEditing ? (
						<div className="bg-gray-100 p-4 rounded-md shadow">
							<p className="text-sm font-medium text-gray-500">Nouvelles images</p>
							<input type="file" multiple max={5 - product.images.length} className="w-full p-2 border" onChange={handleImageChange} />
						</div>
					) : null}
				</div>
			</div>
			{/* Reviews Section */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Images</h2>
				<div className="flex flex-row flex-wrap gap-4">
					{product.images.length > 0 ? (
						product.images.map((image, index) => (
							<div key={index} className="bg-gray-100 p-4 rounded-md shadow mb-4 w-1/3">
								<img src={image.imageUrl} alt={image.imageId} />
								<button className="bg-red-600 text-white p-2 rounded-lg cursor-pointer" onClick={() => handleDeleteImage(image.imageId)}>
									Supprimer
								</button>
							</div>
						))
					) : (
						<p>No reviews yet.</p>
					)}
				</div>
			</div>
			{/* Discount Section */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Discount</h2>
				<div>
					{product.discount ? (
						<div className="flex flex-col gap-4">
							<div className="flex flex-row justify-end">
								<button
									className="h-10 p-3 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
									onClick={deleteDiscount}>
									Supprimer
								</button>
							</div>
							<div className="bg-gray-100 p-4 rounded-md shadow">
								<p className="text-sm font-medium text-gray-500">Nom</p>
								<p className="text-lg font-semibold">{product.discount.name}</p>
							</div>
							<div className="bg-gray-100 p-4 rounded-md shadow">
								<p className="text-sm font-medium text-gray-500">Nom</p>
								<p className="text-lg font-semibold">{product.discount.value}</p>
							</div>
							<div className="bg-gray-100 p-4 rounded-md shadow">
								<p className="text-sm font-medium text-gray-500">Date de début</p>
								<p className="text-lg font-semibold">{new Date(product.discount.startDate).toLocaleDateString('fr-FR')}</p>
							</div>
							<div className="bg-gray-100 p-4 rounded-md shadow">
								<p className="text-sm font-medium text-gray-500">Date de fin</p>
								<p className="text-lg font-semibold">{new Date(product.discount.endDate).toLocaleDateString('fr-FR')}</p>
							</div>
						</div>
					) : (
						<button
							className="h-10 p-3 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
							onClick={() => setDiscountDialogOpen(true)}>
							Ajout une nouvelle promotion
						</button>
					)}
				</div>
			</div>
			{/* Reviews Section */}
			<div className="border rounded-lg p-4 mb-6">
				<h2 className="text-xl font-semibold mb-4">Reviews</h2>
				{product.reviews.length > 0 ? (
					product.reviews.map((review, index) => (
						<div key={index} className="bg-gray-100 p-4 rounded-md shadow mb-4">
							<p className="text-sm font-medium text-gray-500">Reviewer</p>
							<p className="text-lg font-semibold">
								{review.customerFirstName} {review.customerLastName}
							</p>
							<p className="text-sm font-medium text-gray-500 mt-2">Rating</p>
							<p className="text-lg font-semibold">{review.rating}/5</p>
							<p className="text-sm font-medium text-gray-500 mt-2">Comment</p>
							<p className="text-lg font-semibold">{review.comment}</p>
							<div className="flex flex-row justify-end">
								<button onClick={() => deleteReview(review.userId)} className="bg-red-600 text-white p-2 rounded-lg cursor-pointer">
									Supprimer
								</button>
							</div>
						</div>
					))
				) : (
					<p>No reviews yet.</p>
				)}
			</div>
			{/* Action Buttons */}
			<div className="flex justify-between mt-6">
				<button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
					{isEditing ? 'Cancel' : 'Edit'}
				</button>
				{isEditing && (
					<button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md">
						Save
					</button>
				)}
			</div>
		</div>
	);
};

export default ProductDetail;
