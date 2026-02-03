import { AppHeader } from "@/components/layouts/AppHeader";
import { QrCodeEditor } from "@/components/menu/qr-code-designer/QrCodeDesigner";

export default function QrCodeEditorPage() {
	return (
		<>
			<AppHeader
				heading="QR Code Designer"
				description=""
			/>
			<QrCodeEditor />
		</>
	);
}
