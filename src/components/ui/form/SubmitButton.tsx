import React from "react";

interface ISubmitButton {
  text: string;
  iconType?: string;
  disabled? : boolean;
  onSubmit: (value: any) => any;
}

const SubmitButton: React.FC<ISubmitButton> = ({
  text,
  iconType,
  onSubmit,
  disabled = false,
}) => {
  return (
    <button
      className={`gradient-button flex items-center justify-between p-2 w-48 h-10 sm:h-12 
                 rounded-xl text-[#f8f4e3] text-base sm:text-lg font-semibold cursor-pointer 
                 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={disabled ? undefined : onSubmit} // Empêche l'exécution si désactivé
      disabled={disabled}
    >
      {text}
      <img
        src={require(`../../../assets/icons/form_icons/form_${iconType ? iconType : "next"}.svg`)}
        alt="Icone"
        title="Icone"
        className="ml-2 h-6 w-6 sm:w-8 sm:h-8"
      />
    </button>
  );
};


export default SubmitButton;
