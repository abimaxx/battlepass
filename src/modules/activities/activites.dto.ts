import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { ActivitiesTypeEnum } from './activites.interface'

export class CreateActivitesDTO {
  @ApiProperty()
  @IsString()
  productId: string

  @ApiProperty()
  @IsNumber()
  activityType: ActivitiesTypeEnum

  @ApiProperty()
  @IsNumber()
  rewardXP: number

  @ApiProperty()
  @IsNumber()
  noOfTimes: number
}
