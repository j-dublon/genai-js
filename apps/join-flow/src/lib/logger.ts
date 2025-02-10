import pino from "pino";

const isDevelopment = !process.env.VERCEL;

const logger = pino({
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss.l o",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  level: process.env.LOG_LEVEL || "info",
});

export default logger;
