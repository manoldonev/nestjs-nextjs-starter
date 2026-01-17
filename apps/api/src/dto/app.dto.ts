import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'ok', description: 'Health status' })
  status: string;

  @ApiProperty({
    example: '2026-01-17T12:00:00.000Z',
    description: 'Current timestamp',
  })
  timestamp: string;

  @ApiProperty({ example: 'api', description: 'Service name' })
  service: string;

  @ApiProperty({ example: '0.1.0', description: 'API version' })
  version: string;
}

export class WelcomeResponseDto {
  @ApiProperty({
    example: 'Welcome to the API',
    description: 'Welcome message',
  })
  message: string;

  @ApiProperty({
    example: '/api/docs',
    description: 'Link to API documentation',
  })
  docs: string;
}
