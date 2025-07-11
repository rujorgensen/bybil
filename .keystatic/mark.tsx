import type { ReactElement } from 'react';

// Assume ColorScheme is defined somewhere with 'auto' as one of the possible values
type ColorScheme = 'light' | 'dark' | 'auto';

// BrandMark function type definition using Exclude
type BrandMark = (props: { colorScheme: Exclude<ColorScheme, 'auto'> }) => ReactElement;

// Example Component using the BrandMark type
export const BrandMarkComponent: BrandMark = ({ colorScheme }) => {
	// This function must return a ReactElement and cannot take 'auto' as a colorScheme
	const style = {
		fill: colorScheme === 'dark' ? '#fff' : '#000',
	};
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 750" width={50} style={style}>
			<title>Brand mark</title>
			<path d="M375,632.82a257.81,257.81,0,1,1,182.31-75.51A256.16,256.16,0,0,1,375,632.82Zm0-475.64c-120.11,0-217.82,97.71-217.82,217.82S254.89,592.82,375,592.82,592.82,495.11,592.82,375,495.11,157.18,375,157.18Z" />
			<path d="M374.85,547.47a48.65,48.65,0,0,1-48.59-48.59V251.12a48.59,48.59,0,1,1,97.18,0V498.88A48.65,48.65,0,0,1,374.85,547.47Zm0-304.94a8.6,8.6,0,0,0-8.59,8.59V498.88a8.59,8.59,0,1,0,17.18,0V251.12A8.6,8.6,0,0,0,374.85,242.53Z" />
			<path d="M273.8,495.11a48.77,48.77,0,0,1-8.32-.71A48.23,48.23,0,0,1,234,474.56h0a48.59,48.59,0,0,1,11.63-67.72L448,263.81a48.59,48.59,0,1,1,56.1,79.35l-202.31,143A48.3,48.3,0,0,1,273.8,495.11ZM476,294.9a8.52,8.52,0,0,0-4.95,1.57l-202.31,143a8.6,8.6,0,0,0-2.06,12h0a8.6,8.6,0,0,0,12,2.06L481,310.5A8.59,8.59,0,0,0,477.46,295,8.41,8.41,0,0,0,476,294.9Z" />
			<path d="M475.91,495.11a48.27,48.27,0,0,1-28-8.92l-202.31-143a48.59,48.59,0,1,1,56.1-79.35l202.31,143a48.59,48.59,0,0,1-19.83,87.56A48.86,48.86,0,0,1,475.91,495.11ZM273.71,294.9a8.45,8.45,0,0,0-1.47.12,8.59,8.59,0,0,0-3.5,15.48l202.31,143a8.59,8.59,0,0,0,12-2.06h0a8.6,8.6,0,0,0-2-12l-202.32-143A8.47,8.47,0,0,0,273.71,294.9Z" />
		</svg>
	);
};
