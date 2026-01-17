import { ConfigType } from '@nestjs/config';
import { appConfigLoader } from './app.config.loader';

export type AppConfigService = ConfigType<typeof appConfigLoader>;
export const AppConfigServiceKey = appConfigLoader.KEY;
