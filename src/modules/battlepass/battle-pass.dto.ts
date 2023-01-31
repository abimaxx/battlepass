import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNumber, IsString } from 'class-validator'
// import { ActivitiesTypeEnum } from './activites.interface'

export class AddBattlePassDTO {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsDateString()
  startDate: Date

  @ApiProperty()
  @IsDateString()
  endDate: Date
}

export class AddBattlePassDetailDTO {
  @ApiProperty()
  @IsString()
  battlePassId: string

  @ApiProperty()
  @IsNumber()
  level: number

  @ApiProperty()
  @IsString()
  rewardFree: string

  @ApiProperty()
  @IsString()
  rewardPaid: string

  @ApiProperty()
  @IsNumber()
  xp: number
}
