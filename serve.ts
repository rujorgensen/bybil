
// serve.ts
const server = Bun.serve({
	port: 6122,
	async fetch(req) {
		const url = new URL(req.url);
		const path = `./dist/client${url.pathname}`;

		try {
			const file = Bun.file(path);

			if (await file.exists()) {
				return new Response(file);
			}

			console.log(`File not found: ${path} ${file}`);

			const isSub = path.includes('/da/') || path.includes('/en/') || path.includes('/it/');

			// Fallback to index.html for SPA routing
			const fallback = Bun.file((isSub ? (`client/${path}/index.html`) : './dist/client/index.html').replaceAll('//', '/'));

			return new Response(fallback, {
				headers: { 'Content-Type': 'text/html' },
			});
		} catch {
			return new Response('Not found', { status: 404 });
		}
	},
});

console.log(`Server running on http://localhost:${server.port}`);
