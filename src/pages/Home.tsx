import HomeLink from '../components/common/HomeLink';

const Home = () => {
	return (
		<div className="flex flex-row flex-wrap justify-center items-center w-full h-[85vh] p-15 gap-10">
			<HomeLink to="/choix-commandes" color="bg-blue-700" content="Commandes"></HomeLink>
			<HomeLink to="/employes" color="bg-red-600" content="Employés"></HomeLink>
			<HomeLink to="/fournisseurs" color="bg-lime-500" content="Fournisseurs"></HomeLink>
			<HomeLink to="/customers" color="bg-yellow-500" content="Clients"></HomeLink>
			<HomeLink to="/family" color="bg-yellow-500" content="Family"></HomeLink>
			<HomeLink to="/roles" color="bg-purple-500" content="Roles"></HomeLink>
			<HomeLink to="/produits" color="bg-amber-700" content="Produits"></HomeLink>
		</div>
	);
};

export default Home;
