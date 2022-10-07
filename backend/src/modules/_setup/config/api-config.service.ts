import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get<T>(key: string) {
    return this.configService.get<T>(key);
  }

  get isProduction() {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get isTest() {
    return this.configService.get('NODE_ENV') === 'test';
  }

  get isDevelopment() {
    return this.configService.get('NODE_ENV') === 'development';
  }
}
