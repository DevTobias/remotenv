import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import node from '@astrojs/node';

export default defineConfig({
	integrations: [preact(), tailwind()],
	output: 'server',
	adapter: node(),
});
