import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api',
      version: '0.1.0',
    };
  }

  getWelcome() {
    return {
      message: 'Welcome to the API',
      docs: '/api/docs',
    };
  }
}
