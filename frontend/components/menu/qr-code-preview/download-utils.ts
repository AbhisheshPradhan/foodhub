import jsPDF from "jspdf";

function serializeSvg(svgEl: SVGSVGElement): string {
	const serializer = new XMLSerializer();
	let svgString = serializer.serializeToString(svgEl);
	if (!svgString.includes("xmlns=")) {
		svgString = svgString.replace(
			"<svg",
			'<svg xmlns="http://www.w3.org/2000/svg"',
		);
	}
	return svgString;
}

function svgToCanvas(
	svgEl: SVGSVGElement,
	width: number,
	height: number,
): Promise<HTMLCanvasElement> {
	return new Promise((resolve, reject) => {
		const svgString = serializeSvg(svgEl);
		const blob = new Blob([svgString], {
			type: "image/svg+xml;charset=utf-8",
		});
		const url = URL.createObjectURL(blob);
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d")!;
			ctx.drawImage(img, 0, 0, width, height);
			URL.revokeObjectURL(url);
			resolve(canvas);
		};
		img.onerror = reject;
		img.src = url;
	});
}

function triggerDownload(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

export function downloadAsSvg(svgEl: SVGSVGElement) {
	const svgString = serializeSvg(svgEl);
	const blob = new Blob([svgString], {
		type: "image/svg+xml;charset=utf-8",
	});
	triggerDownload(blob, "qr-code.svg");
}

export async function downloadAsPng(svgEl: SVGSVGElement) {
	// A4 at ~300 DPI: 2480 x 3508
	const canvas = await svgToCanvas(svgEl, 2480, 3508);
	canvas.toBlob((blob) => {
		if (blob) triggerDownload(blob, "qr-code.png");
	}, "image/png");
}

export async function downloadAsPdf(svgEl: SVGSVGElement) {
	const canvas = await svgToCanvas(svgEl, 2480, 3508);
	const imgData = canvas.toDataURL("image/png");

	const pdf = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: "a4",
	});
	// A4 = 210mm x 297mm
	pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
	pdf.save("qr-code.pdf");
}
