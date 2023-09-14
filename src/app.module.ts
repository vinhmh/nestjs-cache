import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      // store: redisStore,

      // // Store-specific configuration:
      // host: 'localhost',
      // port: 6379,
      isGlobal: true,
      useFactory: async () => ({
        isGlobal: true,
        max: 10_000,
        store: (): any =>
          redisStore({
            commandsQueueMaxLength: 10_000,
            socket: {
              host: 'localhost',
              port: 6379,
            },
          }),
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
