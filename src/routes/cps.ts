import { FastifyInstance } from "fastify";

export default async function cpsRoutes(fastify: FastifyInstance) {
  fastify.get("/cps", async (request, reply) => {
    const now = Date.now();
    const thirtySecondsAgo = now - 30000;

    const count = await fastify.prisma.click.count({
      where: { timestamp: { gte: thirtySecondsAgo } },
    });

    const cps = count / 30;
    return reply.send({ cps });
  });
}
