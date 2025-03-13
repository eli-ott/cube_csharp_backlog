import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ChoixCommandes from '../pages/ChoixCommandes';
import Employes from '../pages/Employes';
import EmployeeDetails from '../pages/EmployeeDetails';
import Fournisseurs from '../pages/Fournisseurs';
import SupplierDetail from '../pages/SupplierDetail';
import Client from '../pages/Customer';
import ClientDetail from '../pages/CustomerDetail';
import CommandesClient from '../pages/CommandesClient';
import CommandesClientDetail from '../pages/CommandesClientDetail';
import CommandesFournisseurDetail from '../pages/CommandesFournisseurDetail';
import CommandesFournisseur from '../pages/CommandesFournisseur';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductsDetail';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/choix-commandes" element={<ChoixCommandes />} />
				<Route path="/employes" element={<Employes />} />
				<Route path="/employes/:id" element={<EmployeeDetails />} />
				<Route path="/fournisseurs" element={<Fournisseurs />} />
				<Route path="/fournisseurs/:id" element={<SupplierDetail />} />
				<Route path="/customers" element={<Client />} />
				<Route path="/customers/:id" element={<ClientDetail />} />
				<Route path="/commandes-client" element={<CommandesClient />} />
				<Route path="/commandes-client/:id" element={<CommandesClientDetail />} />
				<Route path="/commandes-fournisseur" element={<CommandesFournisseur />} />
				<Route path="/commandes-fournisseur/:id" element={<CommandesFournisseurDetail />} />
				<Route path="/produits" element={<Products />} />
				<Route path="/produits/:id" element={<ProductDetail />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
