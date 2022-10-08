import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Environment } from '@prisma/client';

import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CreateEnvironmentDto } from 'src/modules/environments/boundary/dto/create-environment.dto';
import { UpdateEnvironmentDto } from 'src/modules/environments/boundary/dto/update-environment.dto';
import {
  EnvironmentsService,
  EnvironmentsServiceSymbol,
} from 'src/modules/environments/business/environments.service';

@Controller('environments')
export class EnvironmentsController {
  constructor(
    @Inject(EnvironmentsServiceSymbol) private readonly envService: EnvironmentsService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllEnvironments(): Promise<Environment[]> {
    return this.envService.getAll();
  }

  @Get(':name')
  @UseGuards(AuthGuard)
  async getEnvironment(@Param('name') name: string): Promise<Environment> {
    return this.envService.getByName(name);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createEnvironment(@Body() body: CreateEnvironmentDto): Promise<Environment> {
    return this.envService.createEnvironment(body.name);
  }

  @Put(':name')
  @UseGuards(AuthGuard)
  async updateEnvironment(
    @Param('name') name: string,
    @Body() body: UpdateEnvironmentDto
  ): Promise<Environment> {
    const { id } = await this.envService.getByName(name);
    return this.envService.updateEnvironment(id, body);
  }
}
