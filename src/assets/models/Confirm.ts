import { ReactNode } from "react";

export interface ConfirmDialogOptions {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface ConfirmContextType {
  confirm: (message: string) => Promise<boolean>;
}

export interface ConfirmDialogProps {
	message: string;
	onConfirm: () => void;
	onCancel?: () => void;
}