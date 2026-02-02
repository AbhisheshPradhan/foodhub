"use client";

import { LoaderCircle, X } from "lucide-react";
import { Button } from "./Button";

interface DeleteAlertProps {
	type: "item" | "category";
	name?: string;
	isDeleting: boolean;
	onDelete: () => void;
	onClose: () => void;
}

export const DeleteAlert: React.FC<DeleteAlertProps> = ({
	type = "item",
	name,
	isDeleting,
	onDelete,
	onClose,
}) => {
	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
				<div className="flex w-120 max-w-3xl flex-col rounded-xl bg-white shadow-xl h-50">
					<div className="flex items-center gap-3 px-6 pt-6 pb-3">
						<h2 className="flex-1 text-lg font-semibold text-gray-900">
							Delete {type}
						</h2>
						<button
							onClick={onClose}
							className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
						>
							<X size={18} />
						</button>
					</div>
					<div className="flex-1 overflow-y-auto px-6">{`Do you really want to delete your ${type} '${name}'?`}</div>
					<div className="px-6 py-4">
						<div className="flex items-center justify-end">
							<div className="flex items-center gap-4">
								<Button
									type="button"
									onClick={onClose}
									size="xs"
									variant="outline"
								>
									No
								</Button>
								<Button
									onClick={onDelete}
									size="xs"
									className="text-white bg-red-500 hover:bg-red-600 disabled:bg-red-500 disabled:opacity-90"
									disabled={isDeleting}
								>
									{isDeleting ? (
										<LoaderCircle className="size-5 animate-spin" />
									) : (
										<>Delete</>
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
