
// serve.ts
const server = Bun.serve({
	port: 6122,
	async fetch(req) {
		const url = new URL(req.url);
		const path = `./dist${url.pathname}`;

		try {
			const file = Bun.file(path);

			if (await file.exists()) {
				return new Response(file);
			}

			// Fallback to index.html for SPA routing
			const fallback = Bun.file('./dist/index.html');

			return new Response(fallback, {
				headers: { 'Content-Type': 'text/html' },
			});
		} catch {
			return new Response('Not found', { status: 404 });
		}
	},
});

console.log(`Server running on http://localhost:${server.port}`);
