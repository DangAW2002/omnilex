import { readDist, readManifest } from '../../../lib/dist';

export function getStaticPaths() {
  return readManifest().locales.map((locale: string) => ({ params: { locale } }));
}

export function GET({ params }: { params: { locale: string } }) {
  return new Response(readDist(`${params.locale}/search-index.json`), { headers: { 'Content-Type': 'application/json' } });
}
