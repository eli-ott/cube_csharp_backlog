import { Link } from 'react-router-dom';

const ChoixCommandes = () => {
	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-row flex-wrap justify-center items-center w-screen h-screen p-15 gap-15">
				<Link to="/commandes-client" className="flex flex-row justify-center items-center size-2/5 bg-amber-700 rounded-lg">
					Commandes client
				</Link>
				<Link to="/commandes-fournisseur" className="flex flex-row justify-center items-center size-2/5 bg-blue-700 rounded-lg">
					Commandes fournisseur
				</Link>
			</div>
		</div>
	);
};

export default ChoixCommandes;
