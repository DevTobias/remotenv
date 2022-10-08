import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { EnvironmentsModule } from 'src/modules/environments/environments.module';
import { HealthModule } from 'src/modules/_health/health.module';
import { SetupModule } from 'src/modules/_setup/setup.module';

@Module({
  imports: [SetupModule, HealthModule, EnvironmentsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
