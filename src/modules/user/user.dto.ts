import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { ActivitiesTypeEnum } from 'modules/activities/activites.interface'
import { Type } from 'class-transformer'
export class AddUserDTO {
  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  password: string

  @ApiProperty()
  @IsString()
  name: string
}

export class UpdateUserActivityDTO {
  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty()
  @IsString()
  productId: string

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  ActivitiesType: ActivitiesTypeEnum
}
