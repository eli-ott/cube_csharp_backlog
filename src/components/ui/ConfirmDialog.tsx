import React from 'react';
import { ConfirmDialogProps } from '../../assets/models/Confirm';

const ConfirmDialog = ({ message, onConfirm, onCancel }: ConfirmDialogProps) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<p className="text-lg font-semibold">{message}</p>
				<div className="mt-4 flex justify-end gap-3">
					<button onClick={onCancel} className="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
						Cancel
					</button>
					<button onClick={onConfirm} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
