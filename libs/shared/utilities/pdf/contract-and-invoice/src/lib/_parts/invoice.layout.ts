import type { Content, StyleDictionary } from 'pdfmake/interfaces';
import type { IRenter } from '../_interfaces/contract-and-invoice.interfaces';
import type { ICar } from '../_interfaces/car.interfaces';
import { pop100 } from '../_defines/constants.consts';
import { IPhrases } from '../_interfaces/translations.interfaces';
import { calculateHours } from '../_utilities/date.utils';

interface ILine {
	price: number;
};

/**
 *
 */
export const receipt = (
	translations: IPhrases,
	period: {
		start: Date;
		end: Date;
	},
	car: ICar,
	priceInclVat: number,
): { content: Content[]; styles: StyleDictionary; } => ({
	content: [
		// BOX
		// {
		// 	canvas: [
		// 		{
		// 			type: 'rect',
		// 			x: 0,
		// 			y: 0,
		// 			w: 285,
		// 			h: 130,
		// 			r: 5,
		// 			lineColor: 'black',
		// 			// color: pop100,
		// 		},
		// 	],
		// 	relativePosition: {
		// 		x: -10,
		// 		y: -10
		// 	},
		// },
		{
			layout: 'headerLineOnly',
			table: {
				// relativePosition: { x: 340 },
				widths: ['auto', '*', 'auto', 'auto'],
				headerRows: 1,
				body: [
					...(<any>[
						[
							{
								text: translations.orderDetails.toUpperCase(),
								style: 'h2',
								background: pop100,
								colSpan: 4,
							},
							'',
							'',
							'',
						],

						[
							{
								text: `${calculateHours(period)} x`,
								noWrap: true,
								style: [
									'qty',
									'rowMargin',
								],
							},
							{
								text: 'time(r)',
								style: [
									'normal',
									'rowMargin',
								],
							},
							{
								text: 'DKK',
								noWrap: true,
								style: [
									'rowMargin',
									'currency',
									'discrete',
								],
							},
							{
								text: priceInclVat,
								//  this.format(
								// 	venueSettings,
								// 	archivedCustomOrderLine.retailPrice *
								// 	archivedCustomOrderLine.qty,
								// ),
								noWrap: true,
								style: [
									'rowMargin',
									'price',
								],
							},
						],
					]),

					// 					.concat(
					// 						...[].map(
					// 							(
					// 								archivedOrderLine: any,
					// 							) => {
					// 								const extras: string =
					// 									archivedOrderLine.archivedExtraLabels.reduce(
					// 										(
					// 											tot: number,
					// 											ll: number,
					// 											currentIndex: number,
					// 										) =>
					// 											tot +
					// 											(currentIndex > 0
					// 												? ', '
					// 												: '') +
					// 											ll,
					// 										'',
					// 									);
					// 							// .concat([

					// 							// 	{
					// 							// 		text: phrases.orderDetails.toUpperCase(),
					// 							// 		style: 'h2',
					// 							// 		background: pop100,
					// 							// 		//    absolutePosition: {
					// 							// 		//             x: 0,
					// 							// 		//         },
					// 							// 		colSpan: 4,
					// 							// 	},
					// 							// 	'',
					// 							// 	'',
					// 							// 	'',
					// 							// ])
					// 					)
					// 					// ******************************************************************************
					// 					// *** Custom order lines
					// 					// ******************************************************************************

					// 					.concat(),

					// ******************************************************************************
					// *** Discount, subtotal and tax
					// ******************************************************************************
					[
						{
							text: '',
							style: ['doubleMargin'],
						},
						'',
						'',
						'',
					],

					[
						{
							text: '',
							style: ['doubleMargin'],
						},
						'',
						'',
						'',
					],

					[
						'',
						{
							columns: [
								{
									text: //this.capitalize(
										translations.subTotal,
									// ),
									noWrap: true,
									style: ['discrete'],
								},
							],
						},
						{
							text: 'DKK',
							noWrap: true,
							style: ['currency', 'discrete'],
						},
						{
							text: priceInclVat * 0.8,
							//  this.format(
							// 	venueSettings,
							// 	archivedOrder.subtotal,
							// ),
							noWrap: true,
							style: [
								'price',
								'discrete',
							],
						},
					],

					[
						'',
						{
							columns: [
								{
									text: translations['dictionary.tax'],
									noWrap: true,
									style: ['discrete'],
								},
							],
						},
						{
							text: '*',
							noWrap: true,
							style: ['currency', 'discrete'],
						},
						{
							text: priceInclVat * 0.2,
							//  this.format(
							// 	venueSettings,
							// 	archivedOrder.tax,
							// ),
							noWrap: true,
							style: ['price', 'discrete'],
						},
					],

					// // ! Discount
					// [
					// 	'',
					// 	{
					// 		columns: [
					// 			{
					// 				text: // this.capitalize(
					// 					translations['dictionary.discount'],
					// 				// ),
					// 				noWrap: true,
					// 				style: ['discrete'],
					// 			},
					// 		],
					// 	},
					// 	{
					// 		text: 'archivedOrder.currencySymbol',
					// 		noWrap: true,
					// 		style: ['currency', 'discrete'],
					// 	},
					// 	'',
					// 	// {
					// 	// 	text:
					// 	// 		(archivedOrder.discount === 0
					// 	// 			? ''
					// 	// 			: '- ') +
					// 	// 		this.format(
					// 	// 			venueSettings,
					// 	// 			archivedOrder.discount,
					// 	// 		),
					// 	// 	noWrap: true,
					// 	// 	style: ['price', 'discrete'],
					// 	// },
					// ],

					// ******************************************************************************
					// *** Total
					// ******************************************************************************
					[
						{
							colSpan: 4,
							columns: [
								{ width: '*', text: '' },
								{
									width: 'auto',
									layout: 'noBorders',
									table: {
										body: [
											[
												{
													text: translations.total.toUpperCase(),
													colSpan: 2,
													style: [
														'totalHeader',
														'h2',
													],
												},
												'',
											],
											[
												{
													text: '150',
													noWrap: true,
													style: [
														'total',
													],
												},
												'',
												// {
												// 	text: this.format(
												// 		venueSettings,
												// 		archivedOrder.total,
												// 	),
												// 	noWrap: true,
												// 	style: ['totalCurrency'],
												// },
											],
										],
									},
								},
							],
						},
						'',
						'',
						'',
					],
				],

				// ******************************************************************************
				// *** Payment
				// ******************************************************************************
				/*  { text: phrases.payment, style: 'h2' },
				 {
					 style: 'infoTable',
					 layout: 'noBorders',
					 table: {
						 widths: ['*', 'auto', 'auto'],
						 body: (<any>[

						 ]).concat(
							 ...orderLines.map((archivedOrderLine: IArchivedOrderLine_S) => {
								 const extras: string = archivedOrderLine.archivedExtraLabels.reduce((tot, ll, currentIndex: number) => tot + (currentIndex > 0 ? ', ' : '') + ll, '');

								 const aaa = [];

								 // ******************************************************************************
								 // *** Cash
								 // ******************************************************************************
								 if (archivedOrder.payment.cash !== 0) {
									 aaa.push(
										 [
											 { text: 'dictionary.cash', noWrap: true },
											 { text: archivedOrder.currencySymbol, noWrap: true, style: 'currency', },
											 { text: archivedOrder.payment.cash, noWrap: true, style: 'price', },
										 ]
									 );
								 }

								 // ******************************************************************************
								 // *** Card
								 // ******************************************************************************
								 if (archivedOrder.payment.card !== 0) {
									 aaa.push(
										 [
											 { text: 'dictionary.card', noWrap: true },
											 { text: archivedOrder.currencySymbol, noWrap: true, style: 'currency', },
											 { text: archivedOrder.payment.card, noWrap: true, style: 'price', },
										 ]
									 );
								 }

								 // ******************************************************************************
								 // *** Other
								 // ******************************************************************************
								 if (archivedOrder.payment.other !== 0) {
									 aaa.push(
										 [
											 { text: 'dictionary.other', noWrap: true },
											 { text: archivedOrder.currencySymbol, noWrap: true, style: 'currency', },
											 { text: archivedOrder.payment.other, noWrap: true, style: 'price', },
										 ]
									 );
								 }

								 // ******************************************************************************
								 // *** Discount
								 // ******************************************************************************
								 if (archivedOrder.discount !== 0) {
									 aaa.push(
										 [
											 { text: 'dictionary.discount', noWrap: true },
											 { text: archivedOrder.currencySymbol, noWrap: true, style: 'currency', },
											 { text: archivedOrder.discount, noWrap: true, style: 'price', },
										 ]
									 );
								 }


								 // ******************************************************************************
								 // *** Returned
								 // ******************************************************************************
								 if (archivedOrder.returned !== 0) {
									 aaa.push(
										 [
											 { text: 'dictionary.returned', noWrap: true },
											 { text: archivedOrder.currencySymbol, noWrap: true, style: 'currency', },
											 { text: '-' + archivedOrder.returned, noWrap: true, style: 'price', },
										 ]
									 );
								 }

								 return aaa;
							 })
						 ),
					 }
				 },
			*/

				// 			/*       {
				// 	columns: [
				// 		{ width: '*', text: '' },
				// 		{
				// 			width: 'auto',
				// 			table: {
				// 				body: [
				// 					['Column 1', 'Column 2', 'Column 3'],
				// 					['One value goes here', 'Another one here', 'OK?']
				// 				]
				// 			}
				// 		}
				// 	]
				// } */
			},
		},



	],
	styles: {
		contractHeader: {
			bold: true,
			fontSize: 14,
			margin: [0, 0, 0, 8]
		}
	}
});
