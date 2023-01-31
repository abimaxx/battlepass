import { Injectable } from '@nestjs/common'
import { getProductBy, ProductRepository } from './product.repository'
import { uuid } from 'uuidv4'
import { errors } from 'error'
import { ProductInterface } from './product.interface'
import { CreateProductDTO } from './product.dto'

@Injectable()
export class ProductService {
  constructor(public readonly productRepository: ProductRepository) {}

  async addProducts({ name, type, image }: CreateProductDTO) {
    const productDetails = await getProductBy({ name })
    if (productDetails) throw errors.ProductAlreadyExists

    const productInterface: ProductInterface = {
      id: uuid(),
      image,
      type,
      name,
    }

    await this.productRepository.save(productInterface)
    return { message: 'product added successful' }
  }
}
