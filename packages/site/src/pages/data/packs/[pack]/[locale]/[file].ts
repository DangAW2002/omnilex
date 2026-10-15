import { readDist, readManifest } from '../../../../../lib/dist';

const FILES = ['cards.json', 'search-index.json'];

export function getStaticPaths() {
  const manifest = readManifest();
  return manifest.packs
    .filter((pack: any) => pack.kind === 'content')
    .flatMap((pack: any) => manifest.locales.flatMap((locale: string) =>
      FILES.map((file) => ({ params: { pack: pack.id, locale, file } }))
    ));
}

export function GET({ params }: { params: { pack: string; locale: string; file: string } }) {
  return new Response(readDist(`packs/${params.pack}/${params.locale}/${params.file}`), {
    headers: { 'Content-Type': 'application/json' },
  });
}
