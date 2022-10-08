import { Module } from '@nestjs/common';
import { EnvironmentsController } from 'src/modules/environments/boundary/environments.controller';

import { EnvironmentsDatabaseService } from 'src/modules/environments/business/environments-database.service';
import { EnvironmentsServiceSymbol } from 'src/modules/environments/business/environments.service';

@Module({
  controllers: [EnvironmentsController],
  providers: [{ provide: EnvironmentsServiceSymbol, useClass: EnvironmentsDatabaseService }],
  exports: [EnvironmentsServiceSymbol],
})
export class EnvironmentsModule {}
