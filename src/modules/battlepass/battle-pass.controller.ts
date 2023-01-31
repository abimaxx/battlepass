import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AddBattlePassDetailDTO, AddBattlePassDTO } from './battle-pass.dto'
import { BattlePassService } from './battle-pass.service'

@Controller('battle-pass')
@ApiTags('User')
export class BattlePassController {
  constructor(public readonly BattlePassService: BattlePassService) {}

  @Post('add-battlepass')
  async addProduct(@Body() addBattlePassDTO: AddBattlePassDTO) {
    return await this.BattlePassService.addBattlePass(addBattlePassDTO)
  }

  @Post('add-battlepass-details')
  async addBattlepassDetails(@Body() addBattlePassDetailDTO: AddBattlePassDetailDTO) {
    return await this.BattlePassService.addBattlePassDetails(addBattlePassDetailDTO)
  }
}
