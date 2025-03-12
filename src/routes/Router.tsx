import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ChoixCommandes from '../pages/ChoixCommandes';
import Employes from '../pages/Employes';
import EmployeeDetails from '../pages/EmployeeDetails';
import Fournisseurs from '../pages/Fournisseurs';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RegisterConfirmation from '../pages/RegisterConfirmation';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/choix-commandes' element={<ChoixCommandes/>}/>
                <Route path='/employes' element={<Employes/>}/>
                <Route path="/employes/:id" element={<EmployeeDetails />} />
                <Route path="/fournisseurs" element={<Fournisseurs />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/registerConfirmation' element={<RegisterConfirmation/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;