import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const ADMIN_KEY = 'ines2026';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('admin') !== ADMIN_KEY) {
      return Response.json({ error: 'unauthorized' }, { status: 401 });
    }
    const ids = await redis.smembers('response_ids');
    if (!ids || ids.length === 0) {
      return Response.json([]);
    }
    const entries = await Promise.all(ids.map((id) => redis.get(id)));
    return Response.json(entries.filter(Boolean));
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}

