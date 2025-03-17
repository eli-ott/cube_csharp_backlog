import React, { useState } from 'react';
import MailInput from '../components/ui/form/MailInput';
import PasswordInput from '../components/ui/form/PasswordInput';
import SubmitButton from '../components/ui/form/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authentification';
import { notify } from '../utils/notify';
import LoadingDisplay from '../components/ui/LoadingDisplay';
import { useAuth } from '../hooks/AuthContext';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const { setIsLoggedIn } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const mailReg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

		if (!mailReg.test(email)) {
			notify("Le mail n'est pas valide", 'warning');
			return;
		}

		if (await login({ email, password })) {
			setIsLoggedIn(true);
			notify('Vous nous aviez manqué !', 'success');
			navigate('/');
		} else {
			notify('Adresse mail ou mot de passe incorrect.', 'error');
		}

		setIsLoading(false);
	};
	return (
		<div className="flex flex-col items-center justify-start gap-8 w-full max-w-sm md:max-w-md lg:max-w-xl h-1/2 text-[#333333] p-6">
			{isLoading ? <LoadingDisplay /> : null}
			<div className="h-auto w-full">
				<h1 className="pl-2 font-bold text-6xl md:text-7xl lg:text-8xl">Bonjour</h1>
				<span className="pl-2 font-semibold opacity-70 text-base md:text-lg lg:text-xl">Connectez-vous</span>
			</div>
			<form className="flex flex-col gap-4 w-full">
				<MailInput placeholder="Adresse mail" typed={email} onTyping={setEmail} />
				<PasswordInput placeholder="Mot de passe" typed={password} onTyping={setPassword} />
				<div className="w-full flex flex-col items-end justify-center">
					<span className="text-sm md:text-md lg:text-lg cursor-pointer hover:underline mb-10" onClick={() => navigate('/forgot-password')}>
						Mot de passe oublié ?
					</span>
					<SubmitButton text="Se connecter" onSubmit={handleLogin} />
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
