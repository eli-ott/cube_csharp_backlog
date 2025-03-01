export interface ModalSelectProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options: any[];
    optionValue: string;
    optionLabel: string;
    required: boolean;
}