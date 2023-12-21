import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './product/product.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DatabaseModule,
    AuthModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.getOrThrow('RATE_LIMITING_TTL'),
          limit: config.getOrThrow('RATE_LIMIT'),
        },
      ],
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
    
  ],
})
export class AppModule {}
