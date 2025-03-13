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
import Login from '../pages/Login';
import { useAuth } from '../hooks/AuthContext';
import DefaultLayout from '../components/pages_layout/DefaultLayout';
import Family from '../pages/Family';
import Roles from '../pages/Roles';

const Router = () => {
	const { isLoggedIn } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? (
					<>
						<Route
							path="/"
							element={
								<DefaultLayout>
									<Home />
								</DefaultLayout>
							}
						/>
						<Route
							path="/choix-commandes"
							element={
								<DefaultLayout>
									<ChoixCommandes />
								</DefaultLayout>
							}
						/>
						<Route
							path="/employes"
							element={
								<DefaultLayout>
									<Employes />
								</DefaultLayout>
							}
						/>
						<Route
							path="/employes/:id"
							element={
								<DefaultLayout>
									<EmployeeDetails />
								</DefaultLayout>
							}
						/>
						<Route
							path="/fournisseurs"
							element={
								<DefaultLayout>
									<Fournisseurs />
								</DefaultLayout>
							}
						/>
						<Route
							path="/family"
							element={
								<DefaultLayout>
									<Family />
								</DefaultLayout>
							}
						/>
						<Route
							path="/roles"
							element={
								<DefaultLayout>
									<Roles />
								</DefaultLayout>
							}
						/>
						<Route path="/fournisseurs/:id" element={<SupplierDetail />} />
						<Route path="/customers" element={<Client />} />
						<Route path="/customers/:id" element={<ClientDetail />} />
						<Route path="/commandes-client" element={<CommandesClient />} />
						<Route path="/commandes-client/:id" element={<CommandesClientDetail />} />
						<Route path="/commandes-fournisseur" element={<CommandesFournisseur />} />
						<Route path="/commandes-fournisseur/:id" element={<CommandesFournisseurDetail />} />
						<Route path="/produits" element={<Products />} />
						<Route path="/produits/:id" element={<ProductDetail />} />
					</>
				) : (
					<>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
