import { WebhookClient } from 'discord.js';

const webhookClient = new WebhookClient({
	url: import.meta.env.DISCORD_BYBIL_WEBHOOK_URL,
});

export const userRedirected = async (
	ip: string,
	url: string,
) => {
	webhookClient.send({
		content: `A user with IP "${ip}" was redirected to "${url}"\n`,
	});
};
