import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication as App } from '@nestjs/platform-fastify';
import { fastifyStatic } from '@fastify/static';
import { join } from 'path';

import { AppModule } from 'src/app.module';

const initializeApp = async (app: App) => {
	app.setGlobalPrefix('api/v1');

	app.register(fastifyStatic, {
		root: join(__dirname, '..', '..', 'app', 'dist'),
	});
};

const bootstrap = async () => {
	const app: App = await NestFactory.create(AppModule, new FastifyAdapter());
	await initializeApp(app);
	await app.listen(8080);
};

bootstrap();
