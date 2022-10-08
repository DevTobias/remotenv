import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Environment } from '@prisma/client';
import { UpdateEnvironmentDto } from 'src/modules/environments/boundary/dto/update-environment.dto';

import { EnvironmentsService } from 'src/modules/environments/business/environments.service';
import { PrismaService } from 'src/modules/_setup/prisma/prisma.service';

@Injectable()
export class EnvironmentsDatabaseService implements EnvironmentsService {
  constructor(private readonly db: PrismaService) {}

  private variableSelect = { select: { name: true, value: true } };

  async getAll(): Promise<Environment[]> {
    return this.db.environment.findMany({ include: { variables: this.variableSelect } });
  }

  async getByName(name: string): Promise<Environment> {
    return this.db.environment
      .findUniqueOrThrow({ where: { name }, include: { variables: this.variableSelect } })
      .catch(() => {
        throw new HttpException('environment does not exist', HttpStatus.NOT_FOUND);
      });
  }

  async createEnvironment(name: string): Promise<Environment> {
    return this.db.environment
      .create({ data: { name }, include: { variables: true } })
      .catch(() => {
        throw new HttpException(
          'environment with the same name already exists',
          HttpStatus.BAD_REQUEST
        );
      });
  }

  async updateEnvironment(id: string, { variables }: UpdateEnvironmentDto): Promise<Environment> {
    const results = await this.db.$transaction([
      ...variables.map((env) =>
        this.db.environmentVariable.upsert({
          where: {
            name_environmentId: {
              environmentId: id,
              name: env.name,
            },
          },
          create: { name: env.name, value: env.value, environmentId: id },
          update: { value: env.value },
        })
      ),
      this.db.environment.findUnique({
        where: { id },
        include: { variables: this.variableSelect },
      }),
    ]);

    return results[results.length - 1] as Environment;
  }
}
