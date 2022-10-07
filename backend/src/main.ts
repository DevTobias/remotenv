import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication as App } from '@nestjs/platform-fastify';
import { fastifyStatic } from '@fastify/static';
import { join } from 'path';
import { Logger } from 'nestjs-pino';
import { fastifyHelmet } from '@fastify/helmet';

import { AppModule } from 'src/app.module';
import { ApiConfigService } from 'src/modules/_setup/config/api-config.service';

const initializeApp = async (app: App, config: ApiConfigService) => {
  app.useLogger(app.get(Logger));
  await app.register(fastifyHelmet);

  app.setGlobalPrefix(config.get('API_PREFIX'));

  app.register(fastifyStatic, {
    root: join(__dirname, config.get('STATIC_PATH')),
  });
};

const bootstrap = async () => {
  const app: App = await NestFactory.create(AppModule, new FastifyAdapter(), { bufferLogs: true });
  const config = app.get(ApiConfigService);

  await initializeApp(app, config);
  await app.listen(config.get('API_PORT'), config.get('API_HOST'));
};

bootstrap();
