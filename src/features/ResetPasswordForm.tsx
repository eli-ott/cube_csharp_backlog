import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import MailInput from '../components/ui/form/MailInput';
import { sendResetPasswordMail } from '../services/authentification';
import { notify } from '../utils/notify';

const ResetPasswordForm: React.FC = () => {
	const [mail, setMail] = useState<string>('');
	const navigate = useNavigate();

	const handleMailChange = (value: string) => {
		setMail(value);
	};

	const validateForm = async (e: React.FormEvent) => {
		e.preventDefault();

		const mailReg =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

		if (!mailReg.test(mail)) {
			notify("L'email n'est pas valide", 'warning');
			return;
		}

		if (mail) {
			await sendResetPasswordMail(mail);
			setMail('');
			notify('Un mail vous a été envoyé', 'success');
		}
	};

	return (
		<>
			<button
				className="absolute top-2 left-2 h-10 w-52 bg-gray-100 text-black font-medium rounded-md shadow-md hover:bg-gray-800 hover:text-white transition-all cursor-pointer"
				onClick={() => navigate(-1)}>
				Retour
			</button>
			<div className="flex flex-col items-center justify-center p-6">
				<div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
					<p className="mb-4 text-center text-gray-700">
						Veuillez renseigner votre adresse mail. Vous recevrez un lien pour réinitialiser votre mot de passe.
					</p>
					<form className="flex flex-col gap-4">
						<MailInput placeholder="Adresse mail" typed={mail} onTyping={handleMailChange} />
						<button onClick={(e) => validateForm(e)} type="submit" className={` w-full py-2 text-white bg-gray-600 rounded-lg`}>
							Envoyer le mail
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ResetPasswordForm;
