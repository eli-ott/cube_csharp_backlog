import React, { useEffect, useState } from 'react';
import { Family, Product, ProductDialogProps, ProductFormData } from '../../assets/models/Product';
import { AddProduct } from '../../services/Products';
import { Supplier } from '../../assets/models/Fournisseurs';
import { Status } from '../../assets/models/Customer';
import { GetAllSuppliers, GetSuppliers } from '../../services/Fournisseurs';
import { GetStatus } from '../../services/Status';
import { GetFamilies } from '../../services/Families';
import ModalSelect from '../common/ModalSelect';
import ModalButton from '../common/ModalButton';

const ProductDialog: React.FC<ProductDialogProps> = ({ isOpen, onClose, onProductCreated }) => {
	const [formData, setFormData] = useState<ProductFormData>({
		name: undefined,
		cuvee: undefined,
		year: undefined,
		isBio: undefined,
		unitPrice: undefined,
		boxPrice: undefined,
		quantity: undefined,
		autoRestock: undefined,
		autoRestockTreshold: undefined,
		familyId: undefined,
		supplierId: undefined,
		images: [],
		producerName: undefined,
	});
	const [suppliers, setSuppliers] = useState<Supplier[]>();
	const [families, setFamilies] = useState<Family[]>();

	useEffect(() => {
		const getElements = async () => {
			const allSuppliers = await GetAllSuppliers();
			setSuppliers(allSuppliers!.items);
			const allFamilies = await GetFamilies();
			setFamilies(allFamilies!.items);
		};
		getElements();
	}, []);

	const handleChange = (e: any) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleImageChange = (e: any) => {
		setFormData({ ...formData, images: Array.from(e.target.files) });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const productData = new FormData();
		Object.keys(formData).forEach((key) => {
			//@ts-ignore
			if (key === 'images' && formData.images && formData.images.length > 0) {
				formData.images.forEach((file: File) => {
					if (file.size > 5000000) {
						alert('Un des fichier est trop volumineux')
						return;
					};

					productData.append('images', file);
				});
			} else {
				//@ts-ignore
				if (formData[key] != null) {
					//@ts-ignore
					productData.append(key, formData[key]);
				}
			}
		});
		const data = await AddProduct(productData);

		onProductCreated(data!);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
				<h2 className="text-2xl font-bold mb-4">Créer un nouveau produit</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="name"
						placeholder="Nom"
						value={formData.name}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>

					<input
						type="text"
						name="cuvee"
						placeholder="Cuvée"
						value={formData.cuvee}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>

					<input
						type="number"
						name="year"
						placeholder="Année"
						value={formData.year}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
					/>

					<input
						type="text"
						name="producerName"
						placeholder="Nom du producteur"
						value={formData.producerName}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>

					<ModalSelect
						name="supplierId"
						value={formData.supplierId ? formData.supplierId.toString() : ''}
						onChange={handleChange}
						options={suppliers!}
						optionLabel="lastName"
						optionValue="supplierId"
						required={true}></ModalSelect>

					<div className="flex items-center space-x-2">
						<input type="checkbox" name="isBio" checked={formData.isBio} onChange={handleChange} />
						<label>Bio</label>
					</div>

					<input
						type="number"
						name="unitPrice"
						placeholder="Prix unitaire"
						value={formData.unitPrice}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required={formData.boxPrice ? true : false}
					/>

					<input
						type="number"
						name="boxPrice"
						placeholder="Prix par carton"
						value={formData.boxPrice}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required={formData.unitPrice ? false : true}
					/>

					<input
						type="number"
						name="quantity"
						placeholder="Quantité"
						value={formData.quantity}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required
					/>

					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							name="autoRestock"
							checked={formData.autoRestock}
							onChange={handleChange}
							required={formData.autoRestock ? true : false}
						/>
						<label>Restock automatique</label>
					</div>

					<input
						type="number"
						name="autoRestockTreshold"
						placeholder="Quantité limite pour le restock"
						value={formData.autoRestockTreshold}
						onChange={handleChange}
						className="w-full p-2 border rounded-md"
						required={formData.autoRestock}
					/>

					<ModalSelect
						name="familyId"
						value={formData.familyId ? formData.familyId!.toString() : ''}
						onChange={handleChange}
						options={families!}
						optionLabel="name"
						optionValue="familyId"
						required={true}></ModalSelect>

					<input type="file" size={5000000} multiple onChange={handleImageChange} className="w-full p-2 border rounded-md" />

					<div className="flex justify-between space-x-2 w-full">
						<ModalButton label="Annuler" type="button" isCta={false} onClick={() => onClose()}></ModalButton>
						<ModalButton label="Créer" type="submit" isCta={true}></ModalButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductDialog;
