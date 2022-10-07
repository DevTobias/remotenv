import { Module } from '@nestjs/common';

import { ApiConfigModule } from 'src/modules/_setup/config/api-config.module';
import { PinoLoggerModule } from 'src/modules/_setup/logger/pino-logger.module';
import { PrismaModule } from 'src/modules/_setup/prisma/prisma.module';
import { ApiThrottlerModule } from 'src/modules/_setup/throttler/api-throttler.module';

@Module({
  imports: [ApiConfigModule, PinoLoggerModule, ApiThrottlerModule, PrismaModule],
})
export class SetupModule {}
