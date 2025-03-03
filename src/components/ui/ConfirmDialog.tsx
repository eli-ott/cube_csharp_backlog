import React from 'react';
import { ConfirmDialogProps } from '../../assets/models/Confirm';
import ModalButton from '../common/ModalButton';

const ConfirmDialog = ({ message, onConfirm, onCancel }: ConfirmDialogProps) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<p className="text-lg font-semibold">{message}</p>
				<div className="mt-4 flex justify-end gap-3">
					<ModalButton label="Annuler" type="button" onClick={onCancel} isCta={false}></ModalButton>
					<ModalButton label="Valider" type="button" onClick={onConfirm} isCta={true}></ModalButton>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
