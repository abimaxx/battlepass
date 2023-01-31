import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

import { CreatedModified } from '../../helpers'
import { ProductInterface, ProductTypeEnum } from './product.interface'

@Entity()
export class Product extends CreatedModified implements ProductInterface {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ nullable: true })
  image: string

  @Column({ nullable: true })
  type: ProductTypeEnum

  @Column({ nullable: true })
  name: string
}
