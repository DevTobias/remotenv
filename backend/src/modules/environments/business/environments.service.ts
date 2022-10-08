import { Environment } from '@prisma/client';
import { UpdateEnvironmentDto } from 'src/modules/environments/boundary/dto/update-environment.dto';

/** Symbol to inject the environments service */
export const EnvironmentsServiceSymbol = Symbol('EnvironmentsService');

export interface EnvironmentsService {
  /**
   * Returns all the persisted environments with all environment
   * variables.
   *
   * @returns The persisted environments
   */
  getAll(): Promise<Environment[]>;

  /**
   * Returns the environment with the provided name. If the environment
   * is not found (which means it was not created), an {@link HttpException}
   * gets thrown.
   *
   * @param name  The name of the new environment
   * @throws    	{@link HttpException} if no user was found
   * @returns 		The found environment
   */
  getByName(name: string): Promise<Environment>;

  /**
   * Creates a new environment in the database. If the name of the
   * environment does already exist, an {@link HttpException} gets thrown.
   *
   * @param name  The name of the new environment
   * @throws    	{@link HttpException} if no env was found
   * @returns 		The created environment
   */
  createEnvironment(name: string): Promise<Environment>;

  /**
   * Updates a existing environment in the database. If the name of the
   * environment does not exist, an {@link HttpException} gets thrown. You can
   * only update
   *
   * @param id		The id of the environment
   * @param data 	The variables of the environment
   * @throws    	{@link HttpException} if no env was found
   * @returns 		The updated environment
   */
  updateEnvironment(id: string, data: UpdateEnvironmentDto): Promise<Environment>;
}
