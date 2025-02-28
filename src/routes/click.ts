import { FastifyInstance } from "fastify";

const clickTimestamps = new Map<string, number[]>(); // 各IPのクリック履歴

export default async function clickRoutes(fastify: FastifyInstance) {
  fastify.post("/click", async (request, reply) => {
    const ip = request.ip;
    const now = Date.now();

    // 直近1秒のクリック履歴を取得
    const timestamps = clickTimestamps.get(ip) || [];
    const recentClicks = timestamps.filter((t) => now - t < 1000);

    if (recentClicks.length >= 150) {
      return reply.status(429).send({ error: "クリック速度が速すぎます！" });
    }

    // クリックを記録
    recentClicks.push(now);
    clickTimestamps.set(ip, recentClicks);

    await fastify.prisma.click.create({ data: { timestamp: now } });
    return reply.send({ message: "Click recorded", timestamp: now });
  });
}
