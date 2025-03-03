import { Link } from 'react-router';
import HomeLink from '../components/common/HomeLink';

const Home = () => {
	return (
		<div className="flex flex-row flex-wrap justify-center items-center w-screen h-screen p-15 gap-15">
			<HomeLink to="/produits" color="bg-amber-700" content="Produits"></HomeLink>
			<HomeLink to="/choix-commandes" color="bg-blue-700" content="Commandes"></HomeLink>
			<HomeLink to="/employes" color="bg-red-600" content="Employés"></HomeLink>
			<HomeLink to="/fournisseurs" color="bg-lime-500" content="Fournisseurs"></HomeLink>
		</div>
	);
};

export default Home;
