import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateProductDTO } from './product.dto'
import { ProductService } from './product.service'

@Controller('product')
@ApiTags('User')
export class ProductController {
  constructor(public readonly productService: ProductService) {}

  @Post('create-product')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    return await this.productService.addProducts(createProductDTO)
  }
}
