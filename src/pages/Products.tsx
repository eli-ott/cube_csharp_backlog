import React, { useState, useEffect } from 'react';
import { Product } from '../assets/models/Product';
import { DeleteProduct, GetProducts } from '../services/Products';
import trash from '../assets/icons/delete.svg';
import refreshIcon from '../assets/icons/refresh.svg';
import ProductDialog from '../components/ui/ProductDialog';
import { useConfirm } from '../components/common/ConfirmProvider';
import FamilyDialog from '../components/ui/FamilyDialog';
import { useNavigate } from 'react-router-dom';
import ProductSearchBar from '../components/ui/ProductSearchBar';

const Products = () => {
	const confirm = useConfirm();
	const navigate = useNavigate();

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [productDialogOpen, setProductDialogOpen] = useState(false);
	const [familyDialogOpen, setFamilyDialogOpen] = useState(false);
	const [page, setPage] = useState<number>(1);
	const [refresh, setRefresh] = useState<number>(0);
	const [maxPage, setMaxPage] = useState<number>(1);
	const [searchParams, setSearchParams] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			const data = await GetProducts(page, searchParams);

			setProducts(data!.items);
			setMaxPage(data!.totalPages);
			setLoading(false);
		};

		fetchProducts();
	}, [refresh, page, searchParams]);

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
	 * Delete an supplier
	 *
	 * @param {React.MouseEvent} event The event
	 * @param {number} productId Id of the supplier to delete
	 */
	const deleteProduct = async (event: React.MouseEvent, productId: number) => {
		event.stopPropagation();

		let confirmRes = await confirm(`Êtes vous sur de vouloir supprimer le produiut ? Cette action est irreversible.`);
		if (!confirmRes) return;

		await DeleteProduct(productId);
		setRefresh(refresh + 1);
	};

	const onSearch = (serachParams: any) => {
		setSearchParams(serachParams);
	};

	if (loading) return <p>Loading...</p>;
	if (products.length === 0) return <p>No products found.</p>;

	return (
		<div className="overflow-x-auto p-4 flex flex-col gap-4">
			<ProductDialog
				isOpen={productDialogOpen}
				onClose={() => setProductDialogOpen(false)}
				onProductCreated={() => setRefresh(refresh + 1)}
			/>
			<FamilyDialog
				isOpen={familyDialogOpen}
				onClose={() => setFamilyDialogOpen(false)}
				onFamilyCreated={() => {
					setRefresh(refresh + 1);
				}}
			/>

			<div className="actions flex flex-row gap-4">
				<button
					className="h-10 w-10 flex justify-center items-center bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
					onClick={() => setRefresh(refresh + 1)}>
					<img src={refreshIcon} alt="refresh icon" />
				</button>
				<button
					className="h-10 w-52 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
					onClick={() => setProductDialogOpen(true)}>
					Ajouter un produit
				</button>
				<button
					className="h-10 w-52 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition-all cursor-pointer"
					onClick={() => setFamilyDialogOpen(true)}>
					Ajouter une famille
				</button>
			</div>

			<ProductSearchBar onSearch={(e) => onSearch(e)} />

			<table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
				<thead>
					<tr className="bg-gray-700 text-white">
						<th className="text-center px-6 py-3 border-b">Image</th>
						<th className="text-center px-6 py-3 border-b">Nom</th>
						<th className="text-center px-6 py-3 border-b">Cuvée</th>
						<th className="text-center px-6 py-3 border-b">Année</th>
						<th className="text-center px-6 py-3 border-b">Producteur</th>
						<th className="text-center px-6 py-3 border-b">Bio</th>
						<th className="text-center px-6 py-3 border-b">Prix Unitaire</th>
						<th className="text-center px-6 py-3 border-b">Prix par carton</th>
						<th className="text-center px-6 py-3 border-b">Quantité</th>
						<th className="text-center px-6 py-3 border-b">Famille</th>
						<th className="text-center px-6 py-3 border-b">Fournisseur</th>
						<th className="text-center px-6 py-3 border-b">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.productId} className="hover:bg-gray-50" onClick={() => navigate(`/produits/${product.productId}`)}>
							<td className="text-center px-6 py-3 border-b">
								{product.images.length > 0 ? (
									<img src={product.images[0].imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
								) : (
									'Aucune image'
								)}
							</td>
							<td className="text-center px-6 py-3 border-b">{product.name}</td>
							<td className="text-center px-6 py-3 border-b">{product.cuvee}</td>
							<td className="text-center px-6 py-3 border-b">{product.year}</td>
							<td className="text-center px-6 py-3 border-b">{product.producerName}</td>
							<td className="text-center px-6 py-3 border-b">{product.isBio ? 'Oui' : 'Non'}</td>
							<td className="text-center px-6 py-3 border-b">{product.unitPrice.toFixed(2)}€</td>
							<td className="text-center px-6 py-3 border-b">
								{product.boxPrice?.toFixed(2) ?? 'aucun prix'}
								{product.boxPrice ? '€' : ''}
							</td>
							<td className="text-center px-6 py-3 border-b">{product.quantity}</td>
							<td className="text-center px-6 py-3 border-b">{product.family?.name || 'N/A'}</td>
							<td className="text-center px-6 py-3 border-b">
								{product.supplier?.firstName} {product.supplier?.lastName}
							</td>
							<td className="text-center px-6 py-3 border-b" onClick={(event) => deleteProduct(event, product.productId)}>
								<img src={trash} alt="Delete" className="cursor-pointer w-6 h-6 hover:scale-110 transition-transform" />
							</td>
						</tr>
					))}
				</tbody>

				<tfoot>
					<tr>
						<td colSpan={12} className="px-6 py-4 border-t bg-gray-100">
							<div className="flex justify-center gap-4">
								{page !== 1 ? (
									<button
										onClick={() => changePage(-1)}
										className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
										Prev
									</button>
								) : null}
								{page !== 1 ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{1}</span> : null}
								<span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{page}</span>
								{page !== maxPage ? <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{maxPage}</span> : null}
								{page !== maxPage ? (
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

export default Products;
