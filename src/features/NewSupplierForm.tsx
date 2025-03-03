import { useState } from 'react';
import ModalButton from '../components/common/ModalButton';
import ModalTextInput from '../components/common/ModalTextInput';
import { NewSupplierProps } from '../assets/models/Fournisseurs';
import ModalTitle from '../components/common/ModalTitle';

const NewSupplierForm: React.FC<NewSupplierProps> = ({ isOpen, handleSubmit, onClose, data, setData }) => {
	const [formData, setFormData] = useState(data);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const addressFields = ['addressLine', 'city', 'zipCode', 'country', 'complement'];
		let newData;
		if (addressFields.includes(e.target.name)) {
			newData = {
				...formData,
				address: {
                    ...formData.address,
					[e.target.name]: e.target.value,
				},
			};
		} else {
			newData = { ...formData, [e.target.name]: e.target.value };
		}
        
		setFormData(newData);
		setData(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="flex flex-row gap-6">
				<div className="space-y-4">
					<ModalTitle title="Créer un employé"></ModalTitle>
					<ModalTextInput
						name="firstName"
						type="text"
						placeholder="Prénom"
						value={formData.firstName}
						onChange={handleChange}
						required={true}
					/>
					<ModalTextInput
						name="lastName"
						type="text"
						placeholder="Nom de famille"
						value={formData.lastName}
						onChange={handleChange}
						required={true}
					/>
					<ModalTextInput
						name="contact"
						type="text"
						placeholder="Contact"
						value={formData.contact}
						onChange={handleChange}
						required={true}
					/>
					<ModalTextInput name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required={true} />
					<ModalTextInput name="phone" type="text" placeholder="Téléphone" value={formData.phone} onChange={handleChange} required={true} />
					<ModalTextInput name="siret" type="text" placeholder="N° Siret" value={formData.siret} onChange={handleChange} required={true} />
				</div>
				<div className="space-y-4">
					<ModalTitle title="Adresse"></ModalTitle>
					<ModalTextInput
						name="addressLine"
						type="text"
						placeholder="Adresse"
						value={formData.address.addressLine}
						onChange={handleChange}
						required={true}
					/>
					<ModalTextInput
						name="city"
						type="text"
						placeholder="Ville"
						value={formData.address.city}
						onChange={handleChange}
						required={true}
					/>
					<ModalTextInput
						name="zipCode"
						type="text"
						placeholder="Code postal"
						value={formData.address.zipCode}
						onChange={handleChange}
						required={true}
					/>
					<ModalTextInput
						name="country"
						type="text"
						placeholder="Pays"
						value={formData.address.country}
						onChange={handleChange}
						required={true}
					/>
					<ModalTextInput
						name="complement"
						type="text"
						placeholder="Complément"
						value={formData.address.complement}
						onChange={handleChange}
						required={true}
					/>
				</div>
			</div>

			<div className="flex justify-end gap-2">
				<ModalButton type="button" onClick={onClose} label="Annuler" isCta={false}></ModalButton>
				<ModalButton type="submit" label="Créer" isCta={true}></ModalButton>
			</div>
		</form>
	);
};

export default NewSupplierForm;
