// gomore-filter.ts
import { readFileSync } from 'fs';
import { $fetch } from 'ofetch';

type Car = {
	id: number;
	rating: number;
	antal_anmeldelser: number;
	by: string;
	url: string;
	beskrivelse?: string;
};

async function fetchBeskrivelse(carId: number): Promise<string | null> {
	try {
		const res = await $fetch(`https://gomore.dk/api/javascript/v96/rental_ads/${carId}/details/owner_info`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const sections = res?.data?.sections || [];
		for (const section of sections) {
			for (const el of section.elements || []) {
				const body = el?.content?.body;
				if (Array.isArray(body)) {
					for (const item of body) {
						const text = item?.element?.text;
						if (typeof text === 'string' && text.length > 20) {
							return text;
						}
					}
				}
			}
		}

		return null;
	} catch (err) {
		console.error(`Fejl ved hentning af beskrivelse for bil ${carId}:`, err);
		return null;
	}
}

function filterCarsFromFile(filePath: string): Car[] {
	const rawData = readFileSync(filePath, 'utf-8');
	const data = JSON.parse(rawData);
	const cars: Car[] = [];

	for (const car of data?.data?.hits || []) {
		const elements = car?.rating_row?.elements || [];
		let rating: number | null = null;
		let count: number = 0;

		for (const el of elements) {
			const text = el?.atom?.text;
			if (typeof text === 'string') {
				if (text.includes('ratings')) {
					const match = text.match(/^(\d+)/);
					if (match) count = parseInt(match[1], 10);
				} else if (text.match(/^\d\.\d$/)) {
					rating = parseFloat(text);
				}
			}
		}

		if ((rating === 4.9 || rating === 5.0) && count >= 10) {
			cars.push({
				id: car.id,
				rating,
				antal_anmeldelser: count,
				by: car.formatted_location || 'Ukendt',
				url: `https://gomore.dk/lejebil/${car.id}`,
			});
		}
	}

	return cars;
}

// Indlæs og kombiner filer
const files = [
	'./data/gomore-results-copenhagen-2025-06-26.json',
	'./data/gomore-results-aarhus-2025-06-26.json',
	'./data/gomore-results-randers-2025-06-26.json',
	'./data/gomore-results-helsingor-2025-06-26.json',
];

async function main() {
	let allCars: Car[] = [];
	for (const file of files) {
		const filtered = filterCarsFromFile(file);
		allCars = allCars.concat(filtered);
	}

	if (allCars.length === 0) {
		console.log('Ingen biler med rating 4.9 eller 5.0 og mindst 10 anmeldelser.');
		return;
	}

	for (const car of allCars) {
		car.beskrivelse = await fetchBeskrivelse(car.id);
	}

	console.log(allCars);
}

main();
