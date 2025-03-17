import React, { useState } from 'react';
import { CreateSupplierOrder, SupplierOrderDialogProps } from '../../assets/models/SupplierOrder';
import { CreateCommandeFournisseur } from '../../services/CommandesFournisseur';
import NewSupplierOrderForm from '../../features/NewSupplierOrder';
import ModalTitle from '../common/ModalTitle';
import { notify } from '../../utils/notify';
import { getCustomerInfoFromToken } from '../../services/authentification';

const SupplierOrderDialog: React.FC<SupplierOrderDialogProps> = ({ isOpen, product, onClose, onOrderCreated }) => {
	const [quantity, setQuantity] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!quantity.trim()) {
			notify('Le nom de la famille est requis.', 'error');
			return;
		}

		try {
			let date = new Date();
			const newOrder: CreateSupplierOrder = {
				employeeId: getCustomerInfoFromToken()?.id,
				statusId: 1,
				deliveryDate: new Date(date.setDate(date.getDate() + 7)).toISOString(),
				orderLines: [{
					productId: product.productId,
					unitPrice: product.unitPrice,
					quantity: parseInt(quantity),
				}],
			};
			let createdOrder = await CreateCommandeFournisseur(newOrder);

			notify('Commande créée avec succès', 'success');

			setQuantity('');
			onOrderCreated();
			onClose();
		} catch (error) {
			console.error('Erreur:', error);
			notify("Une erreur s'est produite.", 'error');
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<ModalTitle title=""></ModalTitle>
				<NewSupplierOrderForm handleSubmit={handleSubmit} onClose={onClose} data={quantity} setData={setQuantity}></NewSupplierOrderForm>
			</div>
		</div>
	);
};

export default SupplierOrderDialog;
