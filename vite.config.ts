import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-svelte-purgecss';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss(),
		nodePolyfills({
			globals: {
				Buffer: true
			}
		})
	],
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],

				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',

				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		],
		coverage: {
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: ['src/**/*.test.{js,ts}', 'src/**/*.spec.{js,ts}'],
			thresholds: {
				lines: 50,
				functions: 50,
				branches: 50,
				statements: 50
			}
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: () => {
					return 'general';
				}
			},
			external: ['sharp']
		}
	}
});
