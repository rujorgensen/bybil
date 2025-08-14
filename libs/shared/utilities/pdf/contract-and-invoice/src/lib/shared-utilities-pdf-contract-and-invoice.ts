import * as pdfMake from 'pdfmake/build/pdfmake.min';
import { PDFGeneratorUtility } from './generate-invoice.utility';

const pdfGeneratorUtility: PDFGeneratorUtility = new PDFGeneratorUtility();

export function sharedUtilitiesPdfContractAndInvoice(

): void {
	const createdPdf: pdfMake.TCreatedPdf = pdfMake
		.createPdf(
			pdfGeneratorUtility
				.generateDOCDefinition(
					{
						receipt: {
							orderNo: '123456789',
						},
						seller: {
							name: 'Bybil ApS',
							addressLines: [
								"Studiestræde 34A, 4. th.",
								"1455 København K",
							],
							vatNumber: '123456789',
						},
						contract: {
							car: {
								make: 'Fiat',
								model: '500E La Prima',
								registrationNumber: 'EK 42 435',
							},
							period: {
								start: new Date('2025-07-21T08:00:00'),
								end: new Date('2025-07-24T22:00:00'),
							},
							renters: [
								{
									fullName: 'Rune Jørgensen',
									licenseNumber: '23243408',
									addressLines: [
										'Studiestræde 34A',
										'1455 København K',
									],
								},
								{
									fullName: 'Chiara Nicola',
									licenseNumber: 'U19B91238J',
									addressLines: [
										'Studiestræde 34A',
										'1455 København K',
									],
								}
							]
						}
					}
				),
		)
		// Alternatives: open(), print(), download(customName?: string)
		// .download(
		// 	new Date().toString(),
		// )
		;

	createdPdf
		.getBlob(async (blob: Blob) => {
			console.log(blob, new Date() + ' - PDF created successfully');

			const path = "./file.pdf";
			await Bun.write(path, blob);
			console.log('File written to:', path);

		});
}

sharedUtilitiesPdfContractAndInvoice();
