import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Employes from '../pages/Employes';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/employes' element={<Employes/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;