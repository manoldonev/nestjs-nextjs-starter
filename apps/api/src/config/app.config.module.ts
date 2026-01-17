import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigLoader } from './app.config.loader';
import { validationSchema } from './envValidation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigLoader],
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema,
    }),
  ],
  providers: [],
  exports: [],
})
export class AppConfigModule {}
