export interface ModalButtonProps {
	label: string;
	type: 'submit' | 'reset' | 'button' | undefined;
    isCta: boolean;
	onClick?: () => void;
}