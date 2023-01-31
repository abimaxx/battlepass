import { BadRequestException } from '@nestjs/common'

const commonText = `Error:`
export const errors = {
  ProductNotFound: new BadRequestException(`${commonText} Product not found`),
  RewardNotFound: new BadRequestException(`${commonText} Reward not found`),
  ProductAlreadyExists: new BadRequestException(`${commonText} Product Already exist`),
  BattlePassAlreadyExists: new BadRequestException(`${commonText} Battle pass Already exist`),
  BattlePassNotFound: new BadRequestException(`${commonText} Battle pass Not found`),
  BattlePassLevelAlreadyExists: new BadRequestException(`${commonText} Battle pass level already added`),
}
