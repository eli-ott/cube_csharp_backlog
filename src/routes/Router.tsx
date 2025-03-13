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
						<Route
							path="/fournisseurs/:id"
							element={
								<DefaultLayout>
									<SupplierDetail />
								</DefaultLayout>
							}
						/>
						<Route
							path="/customers"
							element={
								<DefaultLayout>
									<Client />
								</DefaultLayout>
							}
						/>
						<Route
							path="/customers/:id"
							element={
								<DefaultLayout>
									<ClientDetail />
								</DefaultLayout>
							}
						/>
						<Route
							path="/commandes-client"
							element={
								<DefaultLayout>
									<CommandesClient />
								</DefaultLayout>
							}
						/>
						<Route
							path="/commandes-client/:id"
							element={
								<DefaultLayout>
									<CommandesClientDetail />
								</DefaultLayout>
							}
						/>
						<Route
							path="/commandes-fournisseur"
							element={
								<DefaultLayout>
									<CommandesFournisseur />
								</DefaultLayout>
							}
						/>
						<Route
							path="/commandes-fournisseur/:id"
							element={
								<DefaultLayout>
									<CommandesFournisseurDetail />
								</DefaultLayout>
							}
						/>
						<Route
							path="/produits"
							element={
								<DefaultLayout>
									<Products />
								</DefaultLayout>
							}
						/>
						<Route
							path="/produits/:id"
							element={
								<DefaultLayout>
									<ProductDetail />
								</DefaultLayout>
							}
						/>
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
