import { useNavigate } from 'react-router-dom';
import { logOut } from '../services/authentification';

const Header = () => {
	const navigate = useNavigate();

	return (
		<header className="flex items-center w-full justify-between p-4 bg-none">
			<button
				onClick={() => navigate(-1)}
				className="h-10 w-52 bg-gray-100 text-black font-medium rounded-md shadow-md hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
				Retour
			</button>
			{document.cookie.includes('token') && (
				<button
					onClick={() => {
						logOut();
						document.location.reload();
					}}
					className="h-10 w-52 bg-gray-100 text-black font-medium rounded-md shadow-md hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
					Déconnexion
				</button>
			)}
		</header>
	);
};

export default Header;
