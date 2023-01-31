import { Injectable } from '@nestjs/common'
import { BattlePassDetailsRepository, BattlePassRepository, getBattlePassBy, getBattlePassDetailBy } from './battle-pass.repository'
import { uuid } from 'uuidv4'
import { BattlePassDetailsInterface, BattlePassInterface } from './battle-pass.interface'
import { errors } from 'error'
import { AddBattlePassDetailDTO, AddBattlePassDTO } from './battle-pass.dto'
import { getProductBy } from 'modules/product/product.repository'

@Injectable()
export class BattlePassService {
  constructor(
    public readonly battlePassRepository: BattlePassRepository,
    public readonly battlePassDetailsRepository: BattlePassDetailsRepository
  ) {}

  async addBattlePass({ name, startDate, endDate }: AddBattlePassDTO) {
    const battlePassInfo = await getBattlePassBy({ name })
    if (battlePassInfo) throw errors.BattlePassAlreadyExists
    const battlePassInterface: BattlePassInterface = {
      id: uuid(),
      name,
      startDate,
      endDate,
    }
    await this.battlePassRepository.save(battlePassInterface)
    return { message: 'battle-pass added succeesfully' }
  }

  async addBattlePassDetails({ battlePassId, level, rewardFree, rewardPaid, xp }: AddBattlePassDetailDTO) {
    const battlePassInfo = await getBattlePassBy({ id: battlePassId })
    if (!battlePassInfo) throw errors.BattlePassNotFound
    const battlePassDetails = await getBattlePassDetailBy({ level: level, battlePassId: battlePassInfo.id })
    if (battlePassDetails) throw errors.BattlePassLevelAlreadyExists
    const freeRewarDetails = await getProductBy({ id: rewardFree })
    if (!freeRewarDetails) throw errors.ProductNotFound
    const paidRewardDetails = await getProductBy({ id: rewardPaid })
    if (!paidRewardDetails) throw errors.ProductNotFound
    const battlePassInterface: BattlePassDetailsInterface = {
      id: uuid(),
      battlePassId: battlePassInfo.id,
      level,
      rewardFree,
      rewardPaid,
      xp,
    }
    console.log(battlePassInterface)
    await this.battlePassDetailsRepository.save(battlePassInterface)
    return { message: 'battle pass detail added ' }
  }
}
