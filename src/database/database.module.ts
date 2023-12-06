import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        ConfigModule.forRoot({isGlobal:true}),

        TypeOrmModule.forRootAsync({      
            useFactory:(configService:ConfigService)=>({
              type: 'mysql',
              host: configService.getOrThrow('DB_HOST'),
              port: configService.getOrThrow('DB_PORT'),
              username: configService.getOrThrow('DB_USER'),
              password: configService.getOrThrow('DB_PASSWORD'),
              database: configService.getOrThrow('DB_NAME'),
              synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
              autoLoadEntities: true,

        }),
         inject:[ConfigService],
        }),

    ]

})
         export class DatabaseModule {}
    

    
       
        

            
        