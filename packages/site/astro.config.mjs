import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://termbridge.org',
  base: '/',
  trailingSlash: 'ignore',
  output: 'static'
});
