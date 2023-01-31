import { ActivitiesTypeEnum } from 'modules/activities/activites.interface'

export interface User {
  id: string
  email: string
  password?: string
  emailVerified?: boolean
  name: string
}

export interface UserActivitiesInterface {
  id: string
  userId: string
  referenceId: string
  // referenceType: ReferenceTypeEnum
  ActivitiesType: ActivitiesTypeEnum
}

export enum UserActivitiesTypeEnum {
  like = 1,
  favorite = 2,
}

export interface UserVaultInterface {
  id: string
  userId: string
  productId: string
  active: boolean
  favorite: boolean
}

export enum ReferenceTypeEnum {
  skin = 1,
  spray = 2,
  emote = 3,
}
