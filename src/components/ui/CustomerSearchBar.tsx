import React, { useState } from 'react';

const CustomerSearchBar: React.FC<{ onSearch: (searchParams: any) => void }> = ({ onSearch }) => {
	const [deleted, setDeleted] = useState<boolean>(false);
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const handleSearch = () => {
		const searchParams: { [key: string]: string | boolean } = {};

		if (deleted) searchParams.deleted = deleted ? 'all' : 'none';
		if (firstName) searchParams.first_name = firstName;
		if (lastName) searchParams.last_name = lastName;
		if (email) searchParams.email = email;

		onSearch(searchParams);
	};

	return (
		<div className="flex flex-row w-full justify-around gap-4 p-6 bg-gray-100 rounded-2xl shadow-lg mx-auto">
			<div className="flex flex-row items-center justify-center gap-3">
				<input
					type="checkbox"
					name="deleted"
					id="deleted"
					value={String(deleted)}
					onChange={(e) => {
						setDeleted(e.target.checked);
					}}
				/>
				<label htmlFor="deleted">Clients supprimés</label>
			</div>
			<input
				type="text"
				placeholder="Prénom"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
			/>
			<input
				type="text"
				placeholder="Nom"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
			/>
			<input
				type="text"
				placeholder="Mail"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
			/>
			<button onClick={handleSearch} className="p-3 bg-gray-600 text-white rounded-lg cursor-pointer transition">
				Rechercher
			</button>
		</div>
	);
};

export default CustomerSearchBar;
