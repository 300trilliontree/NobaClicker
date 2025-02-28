import Fastify from "fastify";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import open from "open";
import fastifyStatic from "@fastify/static";
import prismaPlugin from "./plugins/prisma";
import clickRoutes from "./routes/click";
import cpsRoutes from "./routes/cps";

const fastify = Fastify({ logger: true });

// 静的ファイルの提供
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
  prefix: "/",
});

// ルートパスで index.html を表示
fastify.get("/", async (request, reply) => {
  return reply.sendFile("index.html");
});

// PrismaとAPIルートを登録
fastify.register(prismaPlugin);
fastify.register(clickRoutes);
fastify.register(cpsRoutes);

// サーバーのポート番号を設定
fastify.listen({ port: process.env.serverPort as unknown as number }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
  open(address);
});
