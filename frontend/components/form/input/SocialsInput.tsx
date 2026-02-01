import { AtSignIcon } from "lucide-react";
import { TextInput } from "./TextInput";

interface SocialsInputProps {
	id: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SocialsInput: React.FC<SocialsInputProps> = ({
	id,
	placeholder,
	value,
	onChange,
}) => {
	return (
		<TextInput
			id={id}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			startIcon={<AtSignIcon className="size-4" />}
		/>
	);
};
