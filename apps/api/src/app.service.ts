import { Injectable, Logger } from '@nestjs/common';
import { HealthResponseDto, WelcomeResponseDto } from './dto/app.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHealth(): HealthResponseDto {
    this.logger.log('Health check requested');
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api',
      version: '0.1.0',
    };
  }

  getWelcome(): WelcomeResponseDto {
    this.logger.log('Welcome endpoint accessed');
    return {
      message: 'Welcome to the API',
      docs: '/api/docs',
    };
  }
}
