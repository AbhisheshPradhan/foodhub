export type CurrencyCode = "AUD" | "NPR";

interface Currency {
	code: CurrencyCode;
	label: string;
	symbol: string;
}

const currencyOptions: Currency[] = [
	{ code: "AUD", label: "Australian Dollar ($)", symbol: "$" },
	{ code: "NPR", label: "Nepalese Rupee (Rs.)", symbol: "Rs." },
	// { code: "USD", name: "US Dollar", symbol: "$" },
	// { code: "EUR", name: "Euro", symbol: "€" },
	// { code: "GBP", name: "British Pound Sterling", symbol: "£" },
	// { code: "JPY", name: "Japanese Yen", symbol: "¥" },
	// { code: "CNY", name: "Chinese Yuan Renminbi", symbol: "¥" },
	// { code: "INR", name: "Indian Rupee", symbol: "₹" },
	// { code: "CAD", name: "Canadian Dollar", symbol: "$" },
	// { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
	// { code: "RUB", name: "Russian Ruble", symbol: "₽" },
	// { code: "BTC", name: "Bitcoin", symbol: "₿" },
];
interface CurrencySelectProps {
	id: string;
	selectedCurrency: CurrencyCode;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const CurrencySelect: React.FC<CurrencySelectProps> = ({
	id,
	selectedCurrency,
	onChange,
}) => {
	return (
		<>
			<select
				id={id}
				value={selectedCurrency}
				onChange={onChange}
				className="border rounded-lg border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 cursor-pointer"
			>
				{currencyOptions.map((currencyOption) => (
					<option
						key={currencyOption.code}
						value={currencyOption.code}
						className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
					>
						{currencyOption.label}
					</option>
				))}
			</select>
		</>
	);
};
