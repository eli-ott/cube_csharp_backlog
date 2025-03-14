import HomeLink from '../components/common/HomeLink';

const Home = () => {
	return (
		<div className="flex flex-row flex-wrap justify-center items-center w-full h-[85vh] p-15 gap-10">
			<HomeLink to="/choix-commandes" content="Commandes"></HomeLink>
			<HomeLink to="/employes" content="Employés"></HomeLink>
			<HomeLink to="/fournisseurs" content="Fournisseurs"></HomeLink>
			<HomeLink to="/customers" content="Clients"></HomeLink>
			<HomeLink to="/family" content="Famille"></HomeLink>
			<HomeLink to="/roles" content="Rôles"></HomeLink>
			<HomeLink to="/produits" content="Produits"></HomeLink>
		</div>
	);
};

export default Home;
