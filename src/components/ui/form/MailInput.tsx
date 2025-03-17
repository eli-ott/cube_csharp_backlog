import React from "react";

interface IMailInput {
  placeholder: string;
  typed: string;
  onTyping: (value: string) => void;
}

const MailInput: React.FC<IMailInput> = ({ typed, onTyping, placeholder }) => {
  return (
    <div className="relative w-full max-w-2xl  ">
      {/* Icône positionnée dans l'input */}
      <div className="absolute inset-y-0 left-3 flex items-center">
        <img
          src={require("../../../assets/icons/form_icons/form_email.svg").default}
          alt={"Adresse mail"}
          title={"Adresse mail"}
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </div>

      {/* Champ de texte */}
      <input
        className={`w-full h-10 sm:h-12 rounded-lg outline-none shadow-md border border-gray-300 bg-[#f8f4e3]
          text-gray-700 text-base sm:text-lg focus:ring-2 focus:ring-gray-400 transition-all pl-12 sm:pl-14`}
        type="mail"
        onChange={(e) => onTyping(e.target.value)}
        value={typed}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MailInput;
