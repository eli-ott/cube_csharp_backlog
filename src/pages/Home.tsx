import { Link } from 'react-router';
import HomeLink from '../components/common/HomeLink';

const Home = () => {
	return (
		<div className="flex flex-row flex-wrap justify-center items-center w-screen h-screen p-15 gap-15">
			<HomeLink to="/choix-commandes" content="Commandes"></HomeLink>
			<HomeLink to="/employes" content="Employés"></HomeLink>
			<HomeLink to="/fournisseurs" content="Fournisseurs"></HomeLink>
			<HomeLink to="/customers" content="Clients"></HomeLink>
			<HomeLink to="/family" content="Family"></HomeLink>
			<HomeLink to="/roles" content="Roles"></HomeLink>
			<HomeLink to="/produits" content="Produits"></HomeLink>
		</div>
	);
};

export default Home;
