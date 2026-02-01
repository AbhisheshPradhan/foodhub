"use client";

import { TextInput } from "@/components/form/input/TextInput";
import { Label } from "@/components/form/Label";
import { Button } from "@/components/ui/Button";

interface SetupDetailsProps {
	name: string;
	nameError: boolean;
	nameHint: string;
	handleRestaurantDetailChange: (attr: string, value: string) => void;
	isLoading: boolean;
	handleStepChange: (e: React.FormEvent<HTMLFormElement>) => void;
	error: string;
}

export const SetupDetails: React.FC<SetupDetailsProps> = ({
	name,
	nameError,
	nameHint,
	handleRestaurantDetailChange,
	isLoading,
	handleStepChange,
	error,
}) => {
	return (
		<>
			<div className="mb-5 sm:mb-8">
				<h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md dark:text-white/90">
					Welcome!
				</h1>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					Enter your Restaurant details. You can edit this later.
				</p>
			</div>
			<div>
				<form onSubmit={handleStepChange}>
					<div className="space-y-6">
						<div>
							<Label htmlFor="name">
								Restaurant Name{" "}
								<span className="text-error-500">*</span>{" "}
							</Label>
							<TextInput
								id="name"
								placeholder="Enter your Restaurant's name"
								value={name}
								onChange={(e) =>
									handleRestaurantDetailChange(
										"name",
										e.target.value,
									)
								}
								error={nameError}
								hint={nameHint}
							/>
						</div>

						{error && (
							<div className="p-3 text-sm text-center text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
								{error}
							</div>
						)}

						<div className="flex space-between gap-4">
							<Button
								className="w-full"
								size="sm"
								type="submit"
								disabled={isLoading}
							>
								Continue
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
