import React from "react";

interface IPasswordVerificator {
  password: string;
  passwordConfirm: string;
  strength: number;
}

const PasswordVerificator: React.FC<IPasswordVerificator> = ({
  password,
  passwordConfirm,
  strength,
}) => {
  const totalConditions = 6; 

  const fillColor = (strength: number) => {
    if (strength >= totalConditions) return "bg-green-500";
    if (strength === totalConditions - 1) return "bg-orange-500";
    if (strength > 0) return "bg-red-400";
    return "bg-gray-300";
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex">
        {[...Array(totalConditions)].map((_, barIndex) => (
          <div
            key={barIndex}
            className={`
              flex-1 h-2
              ${barIndex < strength ? fillColor(strength) : "bg-gray-300"}
              ${barIndex === 0 ? "rounded-l" : ""}
              ${barIndex === totalConditions - 1 ? "rounded-r" : ""}
              ${barIndex !== 0 ? "border-l border-gray-200" : ""}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordVerificator;
