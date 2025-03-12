import React from "react";

interface IStepModificator {
  actualStep: number;
  setActualStep: (value: number) => void;
}

const StepModificator: React.FC<IStepModificator> = ({
  actualStep,
  setActualStep,
}) => {
  const handlePreviousStep = (): void => {
    if (actualStep > 1) {
      setActualStep(actualStep - 1);
    }

    return;
  };

  return (
    <button
      className="absolute top-5 left-5 w-auto flex flex-row items-center justify-start cursor-pointer"
      onClick={handlePreviousStep}
    >
      <img
        className="w-10 h-10"
        src={require("../../../assets/icons/arrow_back.svg").default}
        alt="Retour"
        title="Retour"
      />
      <span className="text-[#333333] text-xl font-semibold">
        {actualStep === 1 ? "Retour" : "Etape précédente"}
      </span>
    </button>
  );
};

export default StepModificator;
