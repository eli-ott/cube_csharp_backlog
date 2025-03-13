import { Link } from 'react-router-dom';
import HomeLink from '../components/common/HomeLink';

const ChoixCommandes = () => {
	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-row flex-wrap justify-center items-center w-screen h-screen p-15 gap-15">
				<HomeLink to="/commandes-client"  content="Commandes client"></HomeLink>
				<HomeLink to="/commandes-fournisseur" content="Commandes fournisseur"></HomeLink>
			</div>
		</div>
	);
};

export default ChoixCommandes;
