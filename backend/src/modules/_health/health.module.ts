import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { HealthController } from 'src/modules/_health/health.controller';
import { PrismaModule } from 'src/modules/_setup/prisma/prisma.module';
import { PrismaHealthIndicator } from 'src/modules/_health/utils/prisma-health-indicator';

@Module({
  imports: [TerminusModule, HttpModule, PrismaModule],
  providers: [PrismaHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
