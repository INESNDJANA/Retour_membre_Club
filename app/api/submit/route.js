import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function POST(request) {
  try {
    const body = await request.json();
    const id = `response:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    const entry = { timestamp: new Date().toISOString(), ...body };
    await redis.set(id, entry);
    await redis.sadd('response_ids', id);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
