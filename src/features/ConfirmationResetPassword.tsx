import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import PasswordInput from '../components/ui/form/PasswordInput';
import { passwordValidator } from '../utils/passwordValidator';
import { validatePasswordReset } from '../services/authentification';
import { notify } from '../utils/notify';

const ConfirmationResetPassword: React.FC = () => {
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();
	const { guid } = useParams<{ guid: string }>();

	const handlePasswordChange = (value: string) => {
		setPassword(value);
		validatePasswords(value, confirmPassword);
	};

	const handleConfirmPasswordChange = (value: string) => {
		setConfirmPassword(value);
		validatePasswords(password, value);
	};

	const validatePasswords = (pass: string, confirmPass: string) => {
		const validation = passwordValidator({
			password: pass,
			passwordConfirm: confirmPass,
		});
		setError(validation.ok ? '' : validation.message);
	};

	const validateForm = async (e: React.FormEvent) => {
		e.preventDefault();
		if (guid) {
			const response = await validatePasswordReset(guid, password);
			if (response) {
				navigate('/login');
				notify('Mot de passe reinitialisé avec succès, vous pouvez vous connecter.', 'success');
			} else {
				setPassword('');
				setConfirmPassword('');
				notify('Erreur lors de la réinitialisation veuillez réessayer.', 'error');
				navigate('/forgot-password');
			}
		}
	};

	return (
		<>
			<button className="cursor-pointer absolute top-2 left-2 text-xl font-semibold" onClick={() => navigate(-1)}>
				Retour
			</button>
			<div className="flex flex-col items-center justify-center p-6">
				<div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
					<p className="mb-4 text-center text-gray-700">Veuillez entrer votre nouveau mot de passe et le confirmer.</p>
					<form className="flex flex-col gap-4">
						<PasswordInput placeholder="Nouveau mot de passe" typed={password} onTyping={handlePasswordChange} />
						<PasswordInput placeholder="Confirmer le mot de passe" typed={confirmPassword} onTyping={handleConfirmPasswordChange} />
						{error && <p className="text-red-500 text-sm">{error}</p>}
						<button
							onClick={(e) => validateForm(e)}
							type="submit"
							className={`${
								password.length === 0 || confirmPassword.length === 0 || error
									? 'cursor-not-allowed bg-gray-400'
									: 'cursor-pointer bg-[#6A1B1A]'
							} w-full py-2 text-white rounded-lg`}
							disabled={password.length === 0 || confirmPassword.length === 0 || error.length !== 0}>
							Confirmer le mot de passe
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ConfirmationResetPassword;
