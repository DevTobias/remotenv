import { Module } from '@nestjs/common';
import { HealthController } from 'src/modules/_health/health.controller';

@Module({ controllers: [HealthController] })
export class HealthModule {}
