import { Link } from 'react-router-dom';

const HomeLink: React.FC<{ to: string; color: string, content: string }> = ({ to, color, content }) => {
	return (
		<Link to={to} className={`flex flex-row justify-center items-center size-2/5 text-3xl ${color} rounded-lg`}>
			{content}
		</Link>
	);
};

export default HomeLink;
