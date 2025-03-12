import React, { useEffect, useState } from "react";
import TextInput from "../components/ui/form/TextInput";
import PasswordInput from "../components/ui/form/PasswordInput";
import MailInput from "../components/ui/form/MailInput";
import PhoneInput from "../components/ui/form/PhoneInput";
import PasswordVerificator from "../components/ui/form/PasswordVerificator";
import SubmitButton from "../components/ui/form/SubmitButton";
import { notify } from "../utils/notify";
import StepModificator from "../components/ui/form/StepModificator";
import HalfTextInput from "../components/ui/form/HalfTextInput";
import { passwordValidator } from "../utils/passwordValidator";
import { emailValidator } from "../utils/emailValidator";
import { register } from "../services/authentification";
import { useNavigate } from "react-router-dom";
import LoadingDisplay from "../components/ui/LoadingDisplay";

const RegisterForm: React.FC = () => {
  const [hasAlreadySkipped, setHasAlreadySkipped] = useState<boolean>(false);
  const [registrationStep, setRegistrationStep] = useState<number>(1);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [address, setAdress] = useState<string>("");
  const [optionnalInfos, setOptionnalInfos] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [isLoading,setIsLoading] = useState<boolean>(false);

  // Stocke l'état de validation
  const [validations, setValidations] = useState({
    emailValid: false,
    passwordValid: false,
    emailMessage: "",
    passwordMessage: "",
    passwordStrength: 0,
  });

  const [isAbleToAdvance, setIsAbleToAdvance] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const emailCheck = emailValidator({ email });
    const passwordCheck = passwordValidator({ password, passwordConfirm });

    setValidations({
      emailValid: emailCheck.ok,
      passwordValid: passwordCheck.ok,
      emailMessage: emailCheck.message,
      passwordMessage: passwordCheck.message,
      passwordStrength: passwordCheck.strength,
    });
  }, [email, password, passwordConfirm]);

  useEffect(() => {
    setIsAbleToAdvance(validations.emailValid && validations.passwordValid);
  }, [validations]);

  const handleGoingToNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (registrationStep === 1) {
      setRegistrationStep(2);
      if (!hasAlreadySkipped) {
        setHasAlreadySkipped(true);
        notify(
          "Plus qu'une étape avant de faire partie de la famille Negosud !",
          "info"
        );
      }
    }
  };

  const handleRegistering = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const isRegistered = await register({
      lastName,
      firstName,
      email,
      phoneNumber,
      password,
      address,
      optionnalInfos,
      city,
      country,
      zipCode,
    });
    setIsLoading(false);
    if (isRegistered) {
      navigate("/");
      notify(
        "Bienvenue chez NegoSud ! Avant de continuer veuillez confirmer votre compte par mail !",
        "success"
      );
    } else {
      notify("Erreur lors de l'inscription", "error");
    }
    
  };

  return (
    <>
      <StepModificator
        actualStep={registrationStep}
        setActualStep={setRegistrationStep}
      />
        {
            isLoading ? <LoadingDisplay/> : null
        }
      <form className="relative z-10 p-8 rounded-lg w-9/10 max-w-xl flex flex-col items-end justify-center gap-4 overflow-hidden">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl w-full font-bold text-gray-800">
          Création de compte
        </h2>

        <p className="text-md sm:text-lg md:text-xl w-full text-left text-gray-500 mb-6">
          {registrationStep === 1
            ? "Informations personnelles"
            : "Informations de livraison"}
        </p>

        {/* Conteneur des étapes avec animation */}
        <div className="relative w-full overflow-hidden h-auto  box-border p-2">
          <div
            className={`flex gap-6 w-[200%] transition-transform duration-300 ease-in-out ${
              registrationStep === 1 ? "translate-x-0" : "-translate-x-[50%]"
            }`}
          >
            {/* Étape 1 - Informations personnelles */}
            <div className="w-full flex flex-col gap-3">
              <TextInput
                placeholder="Nom"
                typed={lastName}
                onTyping={setLastName}
                icon="person"
              />
              <TextInput
                placeholder="Prénom"
                typed={firstName}
                onTyping={setFirstName}
                icon="person"
              />
              <PhoneInput
                placeholder="Numéro de téléphone"
                typed={phoneNumber}
                onTyping={setPhoneNumber}
              />
              <MailInput
                placeholder="Adresse mail"
                typed={email}
                onTyping={setEmail}
              />
              {validations.emailMessage && (
                <span className=" w-full font-semibold text-red-400">
                  {validations.emailMessage}
                </span>
              )}
              <PasswordInput
                placeholder="Mot de passe"
                typed={password}
                onTyping={setPassword}
              />
              <PasswordInput
                placeholder="Confirmer mot de passe"
                typed={passwordConfirm}
                onTyping={setPasswordConfirm}
              />
              <PasswordVerificator
                password={password}
                passwordConfirm={passwordConfirm}
                strength={validations.passwordStrength}
              />
            </div>

            {/* Étape 2 - Adresse de livraison */}
            <div className="w-full flex flex-col gap-4">
              <TextInput
                placeholder="Adresse de livraison"
                typed={address}
                onTyping={setAdress}
              />
              <TextInput
                placeholder="Informations complémentaires"
                typed={optionnalInfos}
                onTyping={setOptionnalInfos}
              />

              <div className="flex flex-row items-center justify-between w-full gap-4">
                <HalfTextInput
                  placeholder="Ville"
                  typed={city}
                  onTyping={setCity}
                />
                <HalfTextInput
                  placeholder="Code postal"
                  typed={zipCode}
                  onTyping={setZipCode}
                />
              </div>

              <HalfTextInput
                placeholder="Pays"
                typed={country}
                onTyping={setCountry}
              />
            </div>
          </div>
        </div>
        {validations.passwordMessage && (
          <span className=" w-full font-semibold text-red-400">
            {validations.passwordMessage}
          </span>
        )}
        <p className="text-sm w-full text-left text-gray-600">
          Vous avez déjà un compte ?{" "}
          <button onClick={()=>navigate("/login")} className="text-gray-600 font-semibold hover:underline cursor-pointer">
            Connectez-vous !
          </button>
        </p>

        <SubmitButton
          text={registrationStep === 1 ? "Étape suivante" : "S'inscrire"}
          iconType="next"
          onSubmit={
            isAbleToAdvance
              ? registrationStep === 1
                ? handleGoingToNextStep
                : handleRegistering
              : () => {}
          }
          disabled={!isAbleToAdvance}
        />
      </form>
    </>
  );
};

export default RegisterForm;
