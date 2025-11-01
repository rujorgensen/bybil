const pad = (n: number) => n.toString().padStart(2, '0');

const monthIndexToText = (
	monthIndex: number,
) => {
	switch (monthIndex) {
		case 0:
			return 'Januar';
		case 1:
			return 'Februar';
		case 2:
			return 'Marts';
		case 3:
			return 'April';
		case 4:
			return 'Maj';
		case 5:
			return 'Juni';
		case 6:
			return 'Juli';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'Oktober';
		case 10:
			return 'November';
		case 11:
			return 'December';
	}

	throw new Error('Invalid month index');
}

export const formatDate = (
	date: Date,
): string => {
	return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const toHumanDate = (
	date: Date,
): string => {
	return `${pad(date.getDate())}. ${monthIndexToText(date.getMonth())} ${date.getFullYear()}, kl. ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const calculateHours = (
	period: {
		start: Date;
		end: Date;
	},
): number => {
	return (period.end.getTime() - period.start.getTime()) / (60_000 * 60);
}
