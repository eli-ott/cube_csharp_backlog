import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ChoixCommandes from '../pages/ChoixCommandes';
import Employes from '../pages/Employes';
import EmployeeDetails from '../pages/EmployeeDetails';
import Fournisseurs from '../pages/Fournisseurs';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/choix-commandes' element={<ChoixCommandes/>}/>
                <Route path='/employes' element={<Employes/>}/>
                <Route path="/employes/:id" element={<EmployeeDetails />} />
                <Route path="/fournisseurs" element={<Fournisseurs />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;