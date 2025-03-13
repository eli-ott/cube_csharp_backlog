import { useState } from 'react';

const ProductSearchBar: React.FC<{ onSearch: (searchParams: any) => void }> = ({ onSearch }) => {
	const [name, setName] = useState('');
	const [deleted, setDeleted] = useState(false);
	const [isBio, setIsBio] = useState(false);

	const handleSearch = () => {
		const searchParams: { [key: string]: string | boolean } = {};

		if (deleted) searchParams.deleted = deleted ? 'all' : 'none';
		if (name) searchParams.name = name;
		if (isBio) searchParams.is_bio = isBio;

		onSearch(searchParams);
	};

	return (
		<div className="flex flex-row w-full justify-around gap-4 p-4 bg-white shadow-lg rounded-lg">
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="border p-2 rounded-lg"
			/>
			<div className="flex flex-row justify-center items-center gap-3">
				<input type="checkbox" name="deleted" id="deleted" value={String(deleted)} onChange={(e) => setDeleted(e.target.checked)} />
				<label htmlFor="deleted">Elements supprimés</label>
			</div>
			<div className="flex flex-row justify-center items-center gap-3">
				<input type="checkbox" name="isBio" id="isBio" value={String(isBio)} onChange={(e) => setIsBio(e.target.checked)} />
				<label htmlFor="isBio">Produits bio</label>
			</div>
			<button onClick={handleSearch} className="bg-gray-600 text-white p-2 rounded-lg cursor-pointer">
				Search
			</button>
		</div>
	);
};

export default ProductSearchBar;
