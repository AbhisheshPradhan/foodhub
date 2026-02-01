"use client";

import React, { useEffect, useRef } from "react";

interface PlaceAutocompleteProps {
	onChange: (address: string) => void;
	defaultValue?: string;
	placeholder?: string;
}

export const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
	onChange,
	defaultValue = "",
	placeholder = "Search restaurant location",
}) => {
	const autocompleteElementRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const element = autocompleteElementRef.current;
		if (!element) return;

		const handlePlaceSelect = async (event) => {
			const place: google.maps.places.Place =
				event.placePrediction.toPlace();
			await place.fetchFields({
				fields: [
					"displayName",
					"formattedAddress",
					"location",
					"viewport",
				],
			});
			const address = place.formattedAddress;
			console.log("handlePlaceSelect address", address);
			onChange(address || "");
		};

		element.addEventListener("gmp-select", handlePlaceSelect);

		return () => {
			element.removeEventListener("gmp-select", handlePlaceSelect);
		};
	}, [onChange]);

	return (
		<div className="w-full">
			<style>
				{`
					gmp-place-autocomplete {
						display: block;
						width: 100%;
						background: unset;
						border: 1px solid #d0d5dd;
						border-radius: 0.5rem;
    					color-scheme: light;
					}
					gmp-place-autocomplete::part(input-container) {	
						border: 1px solid #d0d5dd;
						border-radius: 0.5rem;
					}
					gmp-place-autocomplete::part(input) {
						height: 25px;
						width: 100%;
						appearance: none;
						padding: 0.625rem 1rem;
						font-size: 0.875rem;
						line-height: 1.25rem;
						box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
						background-color: transparent;
						color: #1d2939;
						outline: none;
						transition: border-color 0.15s ease, box-shadow 0.15s ease;
						font-family: Outfit, sans-serif;
					}
					gmp-place-autocomplete::part(input)::placeholder {
						color: #98a2b3;
					}
					gmp-place-autocomplete::part(input):focus {
						border-color: #a3a3a3;
						box-shadow: 0 0 0 3px rgba(31, 31, 31, 0.2);
						outline: none;
					}
				`}
			</style>
			<gmp-place-autocomplete
				ref={autocompleteElementRef}
				placeholder={placeholder}
				value={defaultValue}
				includedRegionCodes={["au", "np"]}
			></gmp-place-autocomplete>
		</div>
	);
};
