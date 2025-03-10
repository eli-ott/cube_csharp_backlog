import React, { createContext, useContext, useState, ReactNode } from "react";
import { ConfirmContextType, ConfirmDialogOptions } from "../../assets/models/Confirm";
import ConfirmDialog from "../ui/ConfirmDialog";

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);

  const confirm = (message: string) => {
    return new Promise<boolean>((resolve) => {
      setOptions({
        message,
        onConfirm: () => {
          resolve(true);
          setOptions(null);
        },
        onCancel: () => {
          resolve(false);
          setOptions(null);
        },
      });
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && <ConfirmDialog {...options} />}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context.confirm;
};
