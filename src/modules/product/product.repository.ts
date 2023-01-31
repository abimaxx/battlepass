import { EntityRepository, Repository } from 'typeorm'

import { getManyBy, getSingleBy } from '../../helpers'
import { Product } from './product.entity'

export const getProductBy = getSingleBy(Product)

export const getProductsBy = getManyBy(Product)
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
