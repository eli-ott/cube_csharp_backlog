/**
 * Validate a password based on the back end requirements
 * 
 * @param {string} password 
 * @returns {string} The error message
 */
export const validatePassword = (password: string): string => {
	const lengthValid = password.length >= 8 && password.length <= 15;
	const upperCaseValid = (password.match(/[A-Z]/g) || []).length >= 2;
	const lowerCaseValid = (password.match(/[a-z]/g) || []).length >= 2;
	const numberValid = (password.match(/[0-9]/g) || []).length >= 2;
	const symbolValid = (password.match(/[\W_]/g) || []).length >= 3; // \W matches non-word characters (symbols)

	if (!lengthValid) {
		return 'Le mot de passe doit contenir entre 8 et 15 caractères.';
	} else if (!upperCaseValid) {
		return 'Le mot de passe doit contenir au moins 2 lettres majuscules.';
	} else if (!lowerCaseValid) {
		return 'Le mot de passe doit contenir au moins 2 lettres minuscules.';
	} else if (!numberValid) {
		return 'Le mot de passe doit contenir au moins 2 chiffres.';
	} else if (!symbolValid) {
		return 'Le mot de passe doit contenir au moins 3 symboles.';
	} else {
		return '';
	}
};
