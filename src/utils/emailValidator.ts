interface IEmailValidator {
  email: string;
}

interface IEmailValidationResult {
  ok: boolean;
  message: string;
}

export const emailValidator = ({
  email,
}: IEmailValidator): IEmailValidationResult => {
  let message = "";

  if (email.length === 0) return { ok: false, message };

  // Vérification de la présence d'un "@"
  if (!/@/.test(email)) {
    message = "L'adresse email doit contenir un '@'.";
    return { ok: false, message };
  }

  // Vérification de la présence d'un nom de domaine après le "@"
  if (!/@[a-zA-Z0-9.-]+\./.test(email)) {
    message = "Le nom de domaine de l'email est invalide.";
    return { ok: false, message };
  }

  // Vérification de la présence d'une extension de domaine (ex: .com, .fr, .org)
  if (!/\.[a-zA-Z]{2,}$/.test(email)) {
    message =
      "L'extension de domaine doit comporter au moins 2 lettres (ex: .com, .fr).";
    return { ok: false, message };
  }

  // Vérification des caractères interdits
  if (/[^a-zA-Z0-9@._-]/.test(email)) {
    message = "L'adresse email contient des caractères non autorisés.";
    return { ok: false, message };
  }

  // Si toutes les validations passent
  return { ok: true, message: "" };
};
