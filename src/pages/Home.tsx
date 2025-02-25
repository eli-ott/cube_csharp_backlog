import { Link } from 'react-router';

const Home = () => {
	return (
		<div className="flex flex-row flex-wrap justify-center items-center w-screen h-screen p-15 gap-15">
			<Link to="/produits" className="flex flex-row justify-center items-center size-2/5 bg-amber-700 rounded-lg">
				Produits
			</Link>
			<Link to="/choix-commandes" className="flex flex-row justify-center items-center size-2/5 bg-blue-700 rounded-lg">
				Commandes
			</Link>
			<Link to="/employes" className="flex flex-row justify-center items-center size-2/5 bg-red-600 rounded-lg">
				Employés
			</Link>
			<Link to="/fournisseurs" className="flex flex-row justify-center items-center size-2/5 bg-lime-500 rounded-lg">
				Fournisseurs
			</Link>
		</div>
	);
};

export default Home;
