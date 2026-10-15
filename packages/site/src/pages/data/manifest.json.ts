import { readDist } from '../../lib/dist';

export function GET() {
  return new Response(readDist('manifest.json'), { headers: { 'Content-Type': 'application/json' } });
}
