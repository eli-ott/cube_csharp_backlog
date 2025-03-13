import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ChoixCommandes from '../pages/ChoixCommandes';
import Employes from '../pages/Employes';
import EmployeeDetails from '../pages/EmployeeDetails';
import Fournisseurs from '../pages/Fournisseurs';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RegisterConfirmation from '../pages/RegisterConfirmation';
import { useAuth } from '../hooks/AuthContext';
import DefaultLayout from '../components/pages_layout/DefaultLayout';
import Family from '../pages/Family';




  
const Router = () => {
    const { isLoggedIn } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? 
                <>
                <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}/>
                <Route path='/choix-commandes' element={<DefaultLayout><ChoixCommandes/></DefaultLayout>}/>
                <Route path='/employes' element={<DefaultLayout><Employes/></DefaultLayout>}/>
                <Route path="/employes/:id" element={<DefaultLayout><EmployeeDetails/></DefaultLayout>} />
                <Route path="/fournisseurs" element={<DefaultLayout><Fournisseurs/></DefaultLayout>} /> 
                <Route path="/family" element={<DefaultLayout><Family/></DefaultLayout>} /> 

                </>
                :                 
                <Route path='/login' element={<Login/>}/>}
                
                    
            </Routes>
        </BrowserRouter>
    );
};

export default Router;