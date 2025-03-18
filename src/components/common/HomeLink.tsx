import { Link } from 'react-router-dom';

const HomeLink: React.FC<{ to: string, content: string }> = ({ to, content }) => {
	return (
		<Link to={to} className={`flex flex-row justify-center text-center items-center size-1/5 lg:text-3xl text-xl rounded-lg text-white bg-gray-700`} content="Commandes">
			{content}
		</Link>
	);
};

export default HomeLink;
