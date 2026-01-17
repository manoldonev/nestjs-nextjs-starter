import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthResponseDto, WelcomeResponseDto } from './dto/app.dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check', description: 'Returns API health status' })
  @ApiResponse({ status: 200, description: 'API is healthy', type: HealthResponseDto })
  getHealth(): HealthResponseDto {
    return this.appService.getHealth();
  }

  @Get()
  @ApiOperation({ summary: 'Welcome', description: 'Returns welcome message and docs link' })
  @ApiResponse({ status: 200, description: 'Welcome message', type: WelcomeResponseDto })
  getWelcome(): WelcomeResponseDto {
    return this.appService.getWelcome();
  }
}
