import { Link } from 'react-router-dom';

const HomeLink: React.FC<{ to: string, content: string }> = ({ to, content }) => {
	return (
		<Link to={to} className={`flex flex-row justify-center items-center size-2/7 text-3xl rounded-lg text-white bg-gray-700`} content="Commandes">
			{content}
		</Link>
	);
};

export default HomeLink;
