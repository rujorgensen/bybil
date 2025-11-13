
import pdfMake from 'pdfmake/build/pdfmake.min';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { fonts } from './vfs.fonts';
import { contract as contract_ } from './_parts/contract.layout';
import type { IRenter } from './_interfaces/contract-and-invoice.interfaces';
import type { ICar } from './_interfaces/car.interfaces';
import { formatDate } from './_utilities/date.utils';
import { receipt } from './_parts/invoice.layout';
import { gray100, gray200, pop200 } from './_defines/constants.consts';
import type { IPhrases } from './_interfaces/translations.interfaces';

export interface ISettings {
	receipt: {
		orderNo: string;
		priceInclVat: number;
		formOfPayment: 'cash' | 'card' | 'bank-transfer' | 'other';
	},
	seller: {
		name: string;
		addressLines: string[];
		vatNumber: string;
	},
	contract: {
		renters: IRenter[];
		car: ICar;
		period: {
			start: Date;
			end: Date;
		};
	}
}

const logo: string = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="372"
    height="193"
    viewBox="0 0 372 193"
>
    <rect
        id="backgroundrect"
        width="100%"
        height="100%"
        fill="none"
    />
    <g>
        <path d="M20.77737641906738,0.9386228027343719 C19.59737641906738,1.5786228027343725 18.199376419067384,3.772622802734375 15.638376419067384,9.00362280273437 C-5.213623580932618,51.59062280273437 -5.2126235809326165,141.3856228027344 15.640376419067383,183.96762280273435 C20.434376419067384,193.75862280273435 20.744376419067386,193.8886228027344 34.867376419067384,192.04962280273435 C68.46337641906739,187.67362280273437 103.54437641906738,170.80062280273438 132.3653764190674,145.15662280273438 L135.27437641906738,142.56762280273438 L138.75037641906738,146.28362280273439 C141.1153764190674,148.81062280273437 143.47137641906738,150.6116228027344 146.12337641906737,151.9176228027344 L150.0203764190674,153.83562280273435 L186.22137641906738,153.83562280273435 L222.42237641906738,153.83562280273435 L226.3193764190674,151.9176228027344 C228.97137641906738,150.6116228027344 231.32737641906738,148.81062280273437 233.6923764190674,146.28362280273439 L237.16837641906739,142.56762280273438 L240.07737641906738,145.15662280273438 C268.8983764190674,170.80062280273438 303.97937641906736,187.67362280273437 337.57537641906737,192.04962280273435 C351.69837641906736,193.8886228027344 352.00837641906736,193.75862280273435 356.8023764190674,183.96762280273435 C377.63337641906736,141.43062280273438 377.63337641906736,51.53462280273436 356.8023764190674,8.998622802734374 C352.00837641906736,-0.7933771972656274 351.69837641906736,-0.9233771972656228 337.57537641906737,0.9166228027343806 C305.3023764190674,5.120622802734374 271.4543764190674,20.93462280273438 243.54637641906737,44.84862280273438 L237.04837641906738,50.416622802734366 L233.67137641906737,46.71062280273438 C231.30237641906737,44.11162280273439 229.12037641906738,42.42762280273436 226.35837641906738,41.06762280273438 L222.42237641906738,39.12962280273439 L186.22137641906738,39.12962280273439 L150.0203764190674,39.12962280273439 L146.08437641906738,41.06762280273438 C143.32237641906738,42.42762280273436 141.1403764190674,44.11162280273439 138.7713764190674,46.71062280273438 L135.39437641906738,50.416622802734366 L128.8963764190674,44.84862280273438 C100.98837641906738,20.93462280273438 67.14037641906738,5.120622802734374 34.867376419067384,0.9166228027343806 C26.28937641906738,-0.20037719726562386 22.867376419067384,-0.1953771972656284 20.77737641906738,0.9386228027343719 M39.15837641906738,14.50962280273437 C68.61237641906739,19.415622802734376 103.73537641906738,37.94262280273438 127.5453764190674,61.132622802734375 L132.1033764190674,65.57262280273437 L132.1033764190674,77.77062280273438 L132.1033764190674,89.96762280273438 L112.11637641906738,90.13662280273437 L92.12937641906738,90.30662280273438 L90.49837641906738,91.93762280273438 C88.15437641906739,94.28362280273439 88.15437641906739,98.68262280273439 90.49837641906738,101.02862280273436 L92.12937641906738,102.65962280273436 L112.11637641906738,102.82862280273437 L132.1033764190674,102.99762280273438 L132.1033764190674,115.24462280273437 L132.1033764190674,127.49162280273438 L126.9563764190674,132.42862280273437 C100.44937641906738,157.85662280273436 64.54137641906738,175.49762280273438 30.62137641906738,179.75762280273437 L27.668376419067386,180.12762280273438 L25.189376419067386,174.26562280273436 C8.609376419067384,135.06162280273438 8.632376419067384,58.17362280273437 25.235376419067386,18.63062280273438 L27.668376419067386,12.837622802734373 L30.62137641906738,13.208622802734368 C32.245376419067384,13.412622802734376 36.08737641906738,13.99762280273437 39.15837641906738,14.50962280273437 M347.2783764190674,18.757622802734375 C362.0453764190674,53.67562280273438 363.87137641906736,122.88462280273438 351.1063764190674,163.83562280273435 C348.9283764190674,170.8216228027344 344.93137641906736,180.01262280273437 344.0693764190674,180.01262280273437 C317.9733764190674,180.01262280273437 271.8623764190674,157.75862280273435 245.48637641906737,132.43362280273436 L240.33937641906738,127.49162280273438 L240.33937641906738,115.24462280273437 L240.33937641906738,102.99762280273438 L260.3263764190674,102.82862280273437 L280.31337641906737,102.65962280273436 L281.9443764190674,101.02862280273436 C283.2863764190674,99.68462280273437 283.5743764190674,98.88362280273438 283.5743764190674,96.48262280273437 C283.5743764190674,94.08262280273436 283.2863764190674,93.28062280273437 281.9443764190674,91.93762280273438 L280.31337641906737,90.30662280273438 L260.3263764190674,90.13662280273437 L240.33937641906738,89.96762280273438 L240.33937641906738,77.72062280273437 L240.33937641906738,65.47362280273438 L245.48637641906737,60.53262280273438 C270.54937641906736,36.47062280273437 305.1253764190674,18.81862280273438 336.9233764190674,13.851622802734369 C345.3103764190674,12.54162280273438 344.4833764190674,12.14962280273437 347.2783764190674,18.757622802734375 M221.3603764190674,52.910622802734366 C222.73137641906737,53.69562280273436 224.58337641906738,55.39362280273437 225.4783764190674,56.68362280273436 L227.1033764190674,59.029622802734366 L227.1033764190674,96.48262280273437 L227.1033764190674,133.93662280273438 L225.4783764190674,136.28262280273438 C224.58337641906738,137.57262280273437 222.73137641906737,139.27062280273438 221.3603764190674,140.05562280273438 L218.86837641906737,141.48262280273437 L186.1753764190674,141.48262280273437 L153.48237641906738,141.48262280273437 L150.63237641906738,139.7186228027344 C148.75137641906738,138.55362280273437 147.3133764190674,137.0636228027344 146.4013764190674,135.33662280273438 L145.01937641906738,132.72062280273437 L145.17937641906738,95.87462280273436 L145.33937641906738,59.02862280273436 L146.9433764190674,56.71362280273436 C148.57837641906738,54.35562280273439 150.9723764190674,52.61662280273438 153.77537641906738,51.75262280273438 C154.63537641906737,51.48662280273439 169.6333764190674,51.31762280273438 187.1033764190674,51.376622802734374 L218.86837641906737,51.48262280273437 L221.3603764190674,52.910622802734366 " />
    </g>
</svg>
`;

export class PDFGeneratorUtility {
	private readonly TRANSLATIONS: IPhrases = {
		receipt: 'Faktura',
		orderNo: 'Faktura nr.',
		createdAt: 'Oprettet d.',
		archivedAt: 'Afsluttet d.',
		by: 'af',
		products: 'Produkter',
		payment: 'Betaling',
		soldBy: 'solgt af',
		date: 'dato',
		orderType: 'ordretype',
		'enums.EOrderType_S.STAY': 'stay',
		'enums.EOrderType_S.TOGO': 'takeaway',
		'enums.EOrderType_S.DELIVER': 'levering',
		paymentType: 'betalingstype',
		vatId: 'CVR nr.',
		orderDetails: 'detaljer',
		total: 'total',
		'dictionary.of': 'af',
		'dictionary.cash': 'kontant',
		'dictionary.card': 'kort',
		'dictionary.bankTransfer': 'bankoverførsel',
		'dictionary.other': 'andet',
		'order.archive.pdf.footerStart': 'Genereret med',
		appName: 'uPOSia',
		'venue.license': 'Freemium',
		url: 'www.bybil.nu',
		'dictionary.discount': 'discount',
		subTotal: 'subtotal',
		'dictionary.tax': 'moms',
	};

	constructor() {
		// * Define fonts
		pdfMake.vfs = fonts;
		pdfMake.fonts = {
			Roboto: {
				normal: 'Roboto-Regular.ttf',
				bold: 'Roboto-Bold.ttf',
				italics: 'Roboto-Regular.ttf',
				bolditalics: 'Roboto-Regular.ttf',
			},
			Montserrat: {
				normal: 'Montserrat-Regular.ttf',
				bold: 'Montserrat-Medium.ttf',
				italics: 'Montserrat-Light.ttf',
				bolditalics: 'Montserrat-Medium.ttf',
			},
		};
	}

	/**
	 * Generates DOC definitions used to create .pdf-file.
	 *
	 * @param { ELOCALE_S }         locale
	 *
	 * @returns { any }
	 */
	public generateDOCDefinition(
		settings: ISettings,
		//	transform: (date: Date, dateFormat: string) => string | null,
		// transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null;
	): TDocumentDefinitions {
		const H2_TOP_PADDING: number = 20;
		const H2_BOTTOM_PADDING: number = 5;

		const phrases: IPhrases = this.TRANSLATIONS;
		const contract = contract_(
			settings.contract.renters,
			settings.contract.period,
			settings.contract.car,
		);

		return {
			content: [
				// ******************************************************************************
				// *** Header
				// ******************************************************************************
				{ text: phrases.receipt, style: 'h1' },

				// ******************************************************************************
				// *** Information
				// ******************************************************************************
				{
					style: 'infoTable',
					layout: 'noBorders',
					table: {
						widths: ['*', 'auto'],
						body: [
							[
								// ******************************************************************************
								// *** Right
								// ******************************************************************************
								[
									{
										text: phrases.soldBy.toUpperCase(),
										style: 'h2',
									},
									{
										text: settings.seller.name,
										style: 'discrete',
									},
									settings.seller.addressLines.map((line: string) => ({
										text: line,
										style: 'discrete',
									})),
									{
										text: settings.seller.vatNumber
											? `${phrases.vatId}: ${settings.seller.vatNumber}`
											: '',
										style: 'discrete',
									},
								],

								// ******************************************************************************
								// *** Left
								// ******************************************************************************
								[
									{
										text: phrases.orderNo.toUpperCase(),
										style: 'h2',
									},
									{
										text: settings.receipt.orderNo,
										style: 'discrete',
									},

									// Date
									{
										text: phrases.date.toUpperCase(),
										style: 'h2',
									},
									{
										text: formatDate(
											new Date(),
											// 'y.MM.dd HH:mm',
										),
										style: 'discrete',
									},

									//  {
									//  	// ('enums.EOrderType_S.' + archivedOrder.type) as string
									//  	text: this.capitalize(
									//  		(<any>phrases)[
									//  		`enums.EOrderType_S.`
									//  		],
									//  	),
									//  	style: 'discrete',
									//  },

									// Payment type
									{
										text: phrases.paymentType.toUpperCase(),
										style: 'h2',
									},

									{
										text: this.capitalize(
											[
												settings.receipt.formOfPayment === 'cash'
													? phrases['dictionary.cash']
													: null,
												settings.receipt.formOfPayment === 'card'
													? phrases['dictionary.card']
													: null,
												settings.receipt.formOfPayment === 'bank-transfer'
													? phrases['dictionary.bankTransfer']
													: null,
												settings.receipt.formOfPayment === 'other'
													? phrases['dictionary.other']
													: null,
											]
												.filter((_) => _ !== null)
												.join(' / ') ??
											//    .reduce((tot, a) => tot + ' / ' + a, '')
											'-',
										),
										style: 'discrete',
									},
								],
							],
						],
					},
				},
				// layout: {
				// 	  fillColor: 'blue',
				// 	  fillOpacity: function (rowIndex: number, node: any, columnIndex: number) {
				// 		  return (rowIndex / 8 + columnIndex / 3);
				// 	  },
				// 	  borderColor:0
				//   },


				// {
				// 	text: phrases.orderDetails.toUpperCase(),
				// 	style: 'h2',
				// 	background: pop100,
				// },

				//  {
				// 	svg: highchartSvg,
				// 	width: 200
				// },
				// {
				// 	qr: "longText",
				// 	fit: 150,
				// 	alignment: 'right',
				// },
				// style: 'tableOpacityExample',
				// layout: {
				// 	/*              paddingLeft: () => 30,
				// 				 paddingRight: () => 30,
				// 				 paddingTop: () => 30,
				// 				 paddingBottom: () => 30,
				// 			  */
				// 	// defaultBorder: false,

				// 	vLineColor: () => {
				// 		return pop100;
				// 	},
				// 	hLineColor: (i: any, node: any) => {
				// 		console.log(i, node);

				// 		return pop100;
				// 	},

				// 	// Top / bottom
				// 	hLineWidth: (i: any, node: any): number => {
				// 		if (i === 0) {
				// 			return tablePadding - H2_TOP_PADDING;
				// 		}

				// 		return i === 0 || i === node.table.body.length
				// 			? tablePadding
				// 			: 0;
				// 	},

				// 	// Left / right
				// 	vLineWidth: (i: any, node: any): number => {
				// 		return i === 0 || i === node.table.body[0].length
				// 			? tablePadding
				// 			: 0;
				// 	},
				// },

				// ******************************************************************************
				// *** Order Details
				// ******************************************************************************

				...receipt(
					phrases,
					settings.contract.period,
					// settings.contract.car,
					settings.receipt.priceInclVat,
				).content,

				// ******************************************************************************
				// *** Contract
				// ******************************************************************************
				...contract.content,
			],


			// [left, top, right, bottom]
			styles: {
				...contract.styles,
				h1: {
					fontSize: 20,
					bold: true,
					margin: [0, 0, 0, 10],
					color: gray200,
				},
				h2: {
					fontSize: 11,
					bold: true,
					margin: [0, H2_TOP_PADDING, 0, H2_BOTTOM_PADDING],
					color: gray100,
					font: 'Roboto',
				},
				totalHeader: {
					margin: [0, H2_TOP_PADDING * 2, 0, 10],
				},
				doubleMargin: {
					margin: [0, H2_TOP_PADDING * 0.5, 0, 0],
				},
				normal: {
					color: gray200,
					fontSize: 11,
				},
				qty: {
					color: gray100,
					alignment: 'right',
				},
				discrete: {
					fontSize: 10,
					color: gray100,

					italics: true, // Means "light"
					font: 'Montserrat',
					/*         const gray100: string = '#757575';
					const gray200: string = '#3e3e3e';
					const pop100: string = '#ddf4ef';
					const pop200: string = '#4ac4a6'; */
				},
				currency: {
					fontSize: 10,
					margin: [0, 0, 0, 0],
					alignment: 'right',
				},
				totalCurrency: {
					fontSize: 30,
					color: gray100,
					italics: true, // Means "light"
					margin: [0, 0, 5, 0],
				},
				total: {
					fontSize: 30,
					bold: true,
					color: gray200,
				},
				price: {
					fontSize: 10,
					alignment: 'right',
					color: gray200,
				},
				infoTable: {
					margin: [0, 0, 0, 0],
				},
				/* totalTable: {
					alignment: 'right',
				}, */

				rowMargin: {
					margin: [0, 12, 0, 0],
				},
				popColor200: {
					color: pop200,
				},
				url: {
					decoration: 'underline',
				},
				footer: {
					fontSize: 8,
					margin: [40, 0, 40, 0],
				},
			},
			/* patterns: {
				// USe like  color: ['stripe45d', 'blue'],
				stripe45d: {
					boundingBox: [1, 1, 4, 4],
					xStep: 3,
					yStep: 3,
					pattern: "1 w 0 1 m 4 5 l s 2 0 m 5 3 l s",
				},
			}, */
			defaultStyle: {
				font: 'Montserrat',
			},

			footer: (
				currentPage: number,
				pageCount: number,
				// pageSize: { width: number; },
			) => {
				// you can apply any logic and return any valid pdfmake element
				return {
					columns: [
						{
							// Fit the svg inside a rectangle
							svg: logo,
							fit: [30, 30],
							width: 'auto' as unknown as number, // The type insists on number, but 'auto' works
						},
						{
							text: [
								{
									text:
										`${phrases['order.archive.pdf.footerStart']} `,
								},
								{
									text: `${phrases.appName} `,
									style: 'popColor200',
								},
								{
									text: phrases['venue.license'],
								},
								{
									text: ' | ',
								},
								{
									text: phrases.url,
									link: `https://${phrases.url}`,
									/*   style: 'url', */
								},
							],
							noWrap: true,
							width: '*',
							alignment: 'center',
						},
						{
							text:
								pageCount === 1
									? ''
									: `${currentPage} ${phrases['dictionary.of']} ${pageCount}`,
							alignment: 'right',
							width: 'auto',
						},
					],
					style: 'footer',
				};
			},
		};
	}

	// ******************************************************************************
	// *** Helpers
	// ******************************************************************************
	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

}
