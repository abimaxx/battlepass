import { Column, Entity, PrimaryColumn } from 'typeorm'

import { CreatedModified } from '../../helpers'
import { ActivitiesInterface, ActivitiesTypeEnum } from './activites.interface'

@Entity()
export class Activities extends CreatedModified implements ActivitiesInterface {
  @PrimaryColumn()
  id: string

  @Column({ nullable: true })
  productId: string

  @Column({ nullable: true })
  activityType: ActivitiesTypeEnum

  @Column({ nullable: true })
  rewardXP: number

  @Column({ nullable: true })
  noOfTimes: number
}
