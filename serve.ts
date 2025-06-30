import { WebhookClient } from 'discord.js';

const REDIRECT_URL: string | undefined = process.env.URL_REDIRECT_NO_1;

if (!REDIRECT_URL) {
	throw new Error('URL_REDIRECT_NO_1 environment variable is not set');
}

const webhookClient = new WebhookClient({
	url: process.env.DISCORD_BYBIL_WEBHOOK_URL ?? '',
});

// serve.ts
const server = Bun.serve({
	port: 6122,
	fetch: async (req: any, server: any) => {
		const url = new URL(req.url);
		const path = `./dist/client${url.pathname}`;

		if (url.pathname === '/r') {
			const ip = server.requestIP(req);

			console.log({
				message: "Redirecting user",
				ip,
				url,
			});

			webhookClient.send({
				content: `A user with IP "${ip.address}" was redirected to "${REDIRECT_URL}"\n`,
			});

			return Response.redirect(REDIRECT_URL, 301);
		}

		try {
			const file = Bun.file(path);

			if (await file.exists()) {
				return new Response(file);
			}

			console.log(`File not found: ${path} ${url.pathname}`);

			const isSub = path.includes('/da/') || path.includes('/en/') || path.includes('/it/');

			// Fallback to index.html for SPA routing
			const fallback = Bun.file(isSub ? `${path}/index.html` : './dist/client/index.html');

			return new Response(fallback, {
				headers: {
					'Content-Type': 'text/html',
				},
			});
		} catch {
			return new Response('Not found', {
				status: 404,
			});
		}
	},
});

console.log(`Server running on http://localhost:${server.port}`);
