import React from 'react';
import { ModalSelectProps } from '../../assets/models/ModalSelect';

const ModalSelect: React.FC<ModalSelectProps> = ({ name, value, onChange, options, optionLabel, optionValue, required }) => {
	return (
		<select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-md" required={required}>
			<option value="" hidden>Veuillez choisir une option</option>
			{options.map((option) => (
				<option key={option[optionValue]} value={option[optionValue]}>
					{option[optionLabel]}
				</option>
			))}
		</select>
	);
};

export default ModalSelect;
