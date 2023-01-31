import { ActivitiesTypeEnum } from '../activities/activites.interface'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

import { CreatedModified } from '../../helpers'
import {  User, UserActivitiesInterface, UserVaultInterface } from './user.interface'

@Entity()
export class Users extends CreatedModified implements User {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ nullable: true })
  email: string

  @Column({ default: false })
  emailVerified: boolean

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  password: string
}

@Entity()
export class UserActivities extends CreatedModified implements UserActivitiesInterface {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ nullable: true })
  userId: string

  @Column({ default: false })
  referenceId: string

  // @Column({ nullable: true })
  // referenceType: ReferenceTypeEnum

  @Column({ nullable: true })
  ActivitiesType: ActivitiesTypeEnum
}

@Entity()
export class UserVault extends CreatedModified implements UserVaultInterface {
  @PrimaryColumn()
  id: string

  @Index()
  @Column({ nullable: true })
  userId: string

  @Column({ default: false })
  productId: string

  @Column({ nullable: true })
  active: boolean

  @Column({ nullable: true })
  favorite: boolean
}
