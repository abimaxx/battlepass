import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BattlePassController } from './battle-pass.controller'
import { BattlePassDetailsRepository, BattlePassRepository, RewardDetailsRepository } from './battle-pass.repository'
import { BattlePassService } from './battle-pass.service'

@Module({
  imports: [TypeOrmModule.forFeature([BattlePassRepository, BattlePassDetailsRepository, RewardDetailsRepository])],
  controllers: [BattlePassController],
  providers: [BattlePassService],
  exports: [BattlePassService],
})
export class BattlePassModule {}
