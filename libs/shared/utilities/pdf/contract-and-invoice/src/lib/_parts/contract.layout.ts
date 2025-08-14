import { calculateHours, toHumanDate } from '../_utilities/date.utils';
import type {
	Content,
	StyleDictionary,
} from 'pdfmake/interfaces';
import type { IRenter } from '../_interfaces/contract-and-invoice.interfaces';
import type { ICar } from '../_interfaces/car.interfaces';

const SPACER = {
	text: '',
	margin: [0, 0, 0, 10]
};

/**
 * Generates the contract PDF layout.
 */
export const contract = (
	renters: IRenter[],
	period: {
		start: Date;
		end: Date;
	},
	car: ICar,
): { content: Content[]; styles: StyleDictionary; } => ({
	content: [
		{
			margin: [0, 40, 0, 0], // top margin to separate from above content
			table: {
				widths: ['*'],
				body: [
					[
						{
							stack: [
								{
									text: 'Kontrakt',
									style: 'contractHeader',
								},

								{
									text: renters.length === 1 ? 'Lejer:' : 'Lejere:',
									bold: true,
									margin: [0, 0, 100, 2],
								},

								// Insert renters
								renterTable(renters),
								SPACER,

								{
									text: 'Køretøj:',
									bold: true,
									margin: [0, 0, 0, 2],
								},

								{
									text: `${car.make} ${car.model}`,
								},
								{
									text: `Reg. nr.: ${car.registrationNumber}`,
									margin: [0, 0, 0, 8]
								},

								SPACER,
								{
									text: 'Lejeperiode:', bold: true, margin: [0, 0, 0, 2]
								},
								{
									text: `Start: ${toHumanDate(period.start)}`,
									margin: [10, 0, 0, 0],
								},
								{
									text: `Slut: ${toHumanDate(period.end)}`,
									margin: [10, 0, 0, 0],
								},
								{
									text: `Varighed: ${calculateHours(period)} timer`,
									margin: [10, 0, 0, 0],
								},

								SPACER,
								{ text: 'Betingelser:', bold: true, margin: [0, 0, 0, 2] },
								{
									margin: [10, 0, 30, 2],
									ul: [
										'Bilen leveres og returneres med samme mængde strøm',
										'Lejer er ansvarlig for eventuelle skader op til en selvrisiko på DKK 5.000',
										'Rygning i bilen er ikke tilladt',
										'Bilen må ikke føres uden gyldigt kørekort',
										'Bilen må kun føres af registreret lejer'
									]
								}
							],
							fillColor: '#fff9c4', // light yellow
							border: [true, true, true, true]
						},
					]
				]
			},
			layout: {
				hLineWidth: () => 1,
				vLineWidth: () => 1,
				hLineColor: () => '#ccc',
				vLineColor: () => '#ccc',
				paddingTop: () => 8,
				paddingBottom: () => 8,
				paddingLeft: () => 10,
				paddingRight: () => 10
			}
		},
	],
	styles: {
		contractHeader: {
			bold: true,
			fontSize: 14,
			margin: [0, 0, 0, 8]
		}
	},
});

/**
 * Generate a table section of renters.
 */
const renterTable = (
	renters: IRenter[],
) => {
	return [
		{
			layout: 'noBorders',
			table: {
				widths: [
					'auto',
					...renters.map(() => '*'),
				],
				body: [
					// * Name
					[
						[
							{
								text: "Navn",
								margin: [10, 0, 50, 2],
							},
						],
						...renters
							.map((renter: IRenter) =>
								[
									{
										text: renter.fullName,
									},
								],
							),
					],

					// * Drivers license
					[
						[
							{
								text: "Kørekortnr.",
								margin: [10, 0, 50, 2],
							},
						],
						...renters
							.map((renter: IRenter) =>
								[
									{
										text: renter.licenseNumber,
									},
								],
							),
					],

					// * Address
					[
						[
							{
								text: "Adresse",
								margin: [10, 0, 50, 2],
							},
						],
						...renters
							.map((renter: IRenter) =>
								[
									{
										text: `${renter.addressLines.join(', ')}`,
									},
								],
							),
					],
				],
			},
		},
	];
}
