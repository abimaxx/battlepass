import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

import { CreatedModified } from '../../helpers'
import { BattlePassDetailsInterface, BattlePassInterface, rewardDetailsInterface, RewardTypeEnum } from './battle-pass.interface'

@Entity()
export class BattlePass extends CreatedModified implements BattlePassInterface {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  startDate: Date

  @Column({ nullable: true })
  endDate: Date
}

@Entity()
export class BattlePassDetails extends CreatedModified implements BattlePassDetailsInterface {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ nullable: true })
  level: number

  @Column({ nullable: true })
  xp: number

  @Column({ nullable: true })
  rewardPaid: string

  @Column({ nullable: true })
  rewardFree: string

  @Column({ nullable: true })
  battlePassId: string
}

@Entity()
export class RewardDetails extends CreatedModified implements rewardDetailsInterface {
  @PrimaryColumn()
  id: string

  @Column({ nullable: true })
  reward: string

  @Column({ nullable: true })
  rewardType: RewardTypeEnum
}
