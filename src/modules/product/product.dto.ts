import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
import { ProductTypeEnum } from './product.interface'

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  image: string

  @ApiProperty()
  @IsNumber()
  type: ProductTypeEnum

  @ApiProperty()
  @IsString()
  name: string
}
