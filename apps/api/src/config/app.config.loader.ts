import { registerAs } from '@nestjs/config';
import { getEnvVar } from './config.helpers';

export const appConfigLoader = registerAs('app', () => {
  return {
    get appName() {
      return getEnvVar('APP_NAME', 'starter-api');
    },

    get nodeEnv() {
      return getEnvVar('NODE_ENV', 'development');
    },

    get port() {
      return getEnvVar('PORT', 3000);
    },

    get webUrl() {
      return getEnvVar('WEB_URL', 'http://localhost:3001');
    },

    // Add more config sections as needed
    // Example:
    // get database() {
    //   return {
    //     url: getEnvVar('DATABASE_URL'),
    //   };
    // },
  };
});
