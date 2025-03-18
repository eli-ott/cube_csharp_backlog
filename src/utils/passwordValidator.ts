interface IPasswordValidator {
  password: string;
  passwordConfirm: string;
}

interface IPasswordConfirmation {
  ok: boolean;
  message: string;
  strength: number;
}

export const passwordValidator = ({
  password,
  passwordConfirm,
}: IPasswordValidator): IPasswordConfirmation => {
  let strength = 0;
  let message = "";

  if (password.length === 0) return { ok: false, message, strength };

  // Vérification des lettres majuscules (au moins 2 majuscules)
  if (/[A-Z]{2,}/.test(password)) {
    strength++;
  } else {
    message = "Le mot de passe doit contenir au moins 2 lettres majuscules.";
    return { ok: false, message, strength };
  }

  // Vérification des lettres minuscules (au moins 2 minuscules)
  if (/[a-z]{2,}/.test(password)) {
    strength++;
  } else {
    message = "Le mot de passe doit contenir au moins 2 lettres minuscules.";
    return { ok: false, message, strength };
  }

  // Vérification des chiffres (au moins 2 chiffres)
  if (/[0-9]{2,}/.test(password)) {
    strength++;
  } else {
    message = "Le mot de passe doit contenir au moins 2 chiffres.";
    return { ok: false, message, strength };
  }

  // Vérification des symboles (au moins 3 symboles spéciaux parmi ceux autorisés)
  if (/[.+*?!:;,^@/$(){}|]{4,}/.test(password)) {
    strength++;
  } else {
    message =
      "Le mot de passe doit contenir au moins 3 symboles spéciaux (par ex. . + * ?).";
    return { ok: false, message, strength };
  }

  // Vérification de la longueur du mot de passe (doit être entre 8 et 15 caractères)
  if (/^.{8,15}$/.test(password)) {
    strength++;
  } else {
    message = "Le mot de passe doit comporter entre 8 et 15 caractères.";
    return { ok: false, message, strength };
  }

  // Vérification de la correspondance des mots de passe
  if (password !== passwordConfirm) {
    message = "Les mots de passe doivent être identiques.";
    return { ok: false, message, strength };
  } else {
    strength++;
  }

  // Si toutes les validations sont passées
  return { ok: true, message: "", strength };
};
