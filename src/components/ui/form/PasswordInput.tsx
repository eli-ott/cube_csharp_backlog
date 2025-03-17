import React, { useState } from "react";

interface IPasswordInput {
  placeholder: string;
  typed: string;
  icon?: string;
  onTyping: (value: string) => void;
}

const PasswordInput: React.FC<IPasswordInput> = ({
  placeholder,
  typed,
  onTyping,
}) => {
  const [passwordShowing, setPasswordShowing] = useState<boolean>(false);

  return (
    <div className="relative w-full max-w-2xl  ">
      {/* Icône positionnée dans l'input */}
      <div className="absolute inset-y-0 left-3 flex items-center">
        <img
          src={require("../../../assets/icons/form_icons/form_password.svg").default}
          alt={"Mot de passe"}
          title={"Mot de passe"}
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </div>

      {/* Champ de texte */}
      <input
        className={`w-full h-10 sm:h-12 rounded-lg outline-none shadow-md border border-gray-300 bg-[#f8f4e3]
          text-gray-700 text-base sm:text-lg focus:ring-2 focus:ring-gray-400 transition-all
     pl-12 sm:pl-14 pr-12 sm:pr-14`}
        type={passwordShowing ? "text" : "password"}
        onChange={(e) => onTyping(e.target.value)}
        value={typed}
        placeholder={placeholder}
      />
      <button
      type="button"
        onClick={() => setPasswordShowing(!passwordShowing)}
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
      >
        <img
          src={require(`../../../assets/icons/form_icons/form_visible${
            passwordShowing ? "_off" : ""
          }.svg`)}
          alt="toggle visibility"
          title="toggle visibility"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </button>
    </div>
  );
};

export default PasswordInput;
