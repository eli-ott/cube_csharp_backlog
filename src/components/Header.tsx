import { useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../services/authentification';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header className="flex items-center w-full justify-between p-4 bg-none">
			{document.cookie.includes('token') && (
				<button
					onClick={() => {
						logOut();
						navigate('/');
						document.location.reload();
					}}
					className="h-10 w-52 bg-gray-100 text-black font-medium rounded-md shadow-md hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
					Déconnexion
				</button>
			)}
			{location.pathname === '/' ? null : (
				<button
					onClick={() => navigate(-1)}
					className="h-10 w-52 bg-gray-100 text-black font-medium rounded-md shadow-md hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
					Retour
				</button>
			)}
		</header>
	);
};

export default Header;
