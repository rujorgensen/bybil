import type { Content, StyleDictionary } from 'pdfmake/interfaces';
import { pop100 } from '../_defines/constants.consts';
import { IPhrases } from '../_interfaces/translations.interfaces';
import { calculateHours } from '../_utilities/date.utils';

/**
 *
 */
export const receipt = (
	translations: IPhrases,
	period: {
		start: Date;
		end: Date;
	},
	priceInclVat: number,
): { content: Content[]; styles: StyleDictionary; } => ({
	content: [
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

					// ******************************************************************************
					// *** Subtotal and tax
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
													text: priceInclVat,
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
