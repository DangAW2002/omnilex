import { defineConfig } from 'astro/config';

const [owner, repository] = (process.env.GITHUB_REPOSITORY || '').split('/');

export default defineConfig({
  site: process.env.TERMBRIDGE_SITE_URL || (owner ? `https://${owner}.github.io` : 'http://localhost:4321'),
  base: process.env.TERMBRIDGE_BASE_PATH || (repository ? `/${repository}/` : '/'),
  trailingSlash: 'ignore',
  output: 'static'
});
