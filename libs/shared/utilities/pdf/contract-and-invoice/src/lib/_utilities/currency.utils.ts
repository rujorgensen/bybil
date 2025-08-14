
/**
 *
 * @param { ISettings_S }   settings
 * @param { any }           value
 *
 * @returns { string }

export const format = (
	settings: ISettings_S,
	value: any,
): string => {
	const thousandSeparator: string =
		settings.numeral.delimiters.thousandSeparatorType ===
			EThousandSeparatorType_S.DOT
			? '.'
			: (settings.numeral.delimiters.thousandSeparatorType ===
				EThousandSeparatorType_S.SPACE
				? ' '
				: ',');
	const decimalSeparator: string =
		settings.numeral.delimiters.thousandSeparatorType ===
			EThousandSeparatorType_S.DOT ||
			settings.numeral.delimiters.thousandSeparatorType ===
			EThousandSeparatorType_S.SPACE
			? ','
			: '.';
	const currencyRoundingFn = (value: number): any =>
		currency(value, {
			increment: settings.finance.increment,
			separator: thousandSeparator,
			decimal: decimalSeparator,
			precision: settings.numeral.decimals,
			// No currency
			pattern: `#`,
			negativePattern: `-#`,
		});
	return currencyRoundingFn(value).format();
}
	*/
