import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { PrismaHealthIndicator } from 'src/modules/_health/utils/prisma-health-indicator';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly db: PrismaHealthIndicator
  ) {}

  @Get('ping')
  ping(): string {
    return 'pong';
  }

  @Get('status')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.isHealthy('database'),
      () => this.memory.checkHeap('backend_memory', 150 * 1024 * 1024),
      () =>
        this.disk.checkStorage('backend_storage', {
          path: '/',
          thresholdPercent: 0.5,
        }),
    ]);
  }
}
