export interface FamilyDialogProps {
    onFamilyCreated: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export interface NewFamilyFormProps {
    handleSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    data: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
}