import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { ConfigService } from 'shared/services/config.service'
import { SharedModule } from 'shared/shared.module'
import { ProductModule } from 'modules/product/product.module'
import { BattlePassModule } from 'modules/battlepass/battle-pass.module'
import { ActivitiesModule } from 'modules/activities/activites.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    UserModule,
    UserModule,
    ProductModule,
    BattlePassModule,
    ActivitiesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
