import { Injectable } from '@nestjs/common'
import {
  getActivityList,
  getTotalXP,
  getUserActivitiesBy,
  getUserActivityBy,
  getUserVaultBy,
  getUserVaultsBy,
  UserActivitiesRepository,
  UserRepository,
  UserVaultRepository,
} from './user.repository'
import { uuid } from 'uuidv4'
import { getProductBy } from 'modules/product/product.repository'
import { errors } from 'error'
// import { UserActivitiesInterface } from './user.interface'
// import { ActivitiesTypeEnum } from 'modules/activities/activites.interface'
import { AddUserDTO, UpdateUserActivityDTO } from './user.dto'
import { getActivitiesBy } from 'modules/activities/activites.repository'
import { UserActivitiesInterface, UserVaultInterface } from './user.interface'
import { ActivitiesTypeEnum } from 'modules/activities/activites.interface'
import { getBassPassDetails } from 'modules/battlepass/battle-pass.repository'
// import { ActivitiesTypeEnum } from 'modules/activities/activites.interface'

@Injectable()
export class UserService {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly userActivitiesRepository: UserActivitiesRepository,
    public readonly userVaultRepository: UserVaultRepository
  ) {}

  async addUser({ email, name, password }: AddUserDTO) {
    await this.userRepository.save({
      id: uuid(),
      email,
      name,
      emailVerified: false,
      password,
    })
    return { message: 'user created successfully' }
  }

  async updateActivities({ userId, productId, ActivitiesType }: UpdateUserActivityDTO) {
    console.log('updateeeee actiivetss --->', userId, productId, ActivitiesType)
    const productDetails = await getProductBy({ id: productId })
    if (!productDetails) throw errors.ProductNotFound
    const userActivitiesInterface: UserActivitiesInterface = {
      id: uuid(),
      userId,
      referenceId: productId,
      ActivitiesType,
    }
    console.log('this is updateee ', userActivitiesInterface)
    await this.userActivitiesRepository.save(userActivitiesInterface)
    const activityDetails = await getActivityList(userId, productId, ActivitiesType)
    console.log('activityDetails -->', activityDetails, 'ActivitiesType---', ActivitiesType, productId)
    const getActivitiesDetails = await getActivitiesBy({ activityType: ActivitiesType, productId })
    console.log('getActivitiesDetailsgetActivitiesDetails ', getActivitiesDetails)
    for (const activity of getActivitiesDetails) {
      console.log('activity.noOfTimes <= activityDetails ', activity.noOfTimes, activityDetails)
      if (activity.noOfTimes <= activityDetails) {
        const ActivityCompleted = await getUserActivityBy({
          referenceId: activity.id,
          ActivitiesType: ActivitiesTypeEnum.completedActivity,
        })
        if (ActivityCompleted) continue
        const userActivitiesInterface: UserActivitiesInterface = {
          id: uuid(),
          userId,
          referenceId: activity.id,
          // referenceType: productDetails.type,
          ActivitiesType: ActivitiesTypeEnum.completedActivity,
        }
        await this.userActivitiesRepository.save(userActivitiesInterface)
        const totalxp = await getTotalXP(userId, ActivitiesTypeEnum.completedActivity)
        console.log('uuuuuuuuuuuuuu ', userId, ActivitiesTypeEnum.completedActivity)
        const battlePassDetails = await getBassPassDetails()
        let xp = 0

        const getActivitiesDetails = await getUserActivityBy({
          ActivitiesType: ActivitiesTypeEnum.boughtPass,
          userId,
          referenceId: battlePassDetails[0]?.battlePassId,
        })
        console.log('this is total xp ')
        for (const battlepass of battlePassDetails) {
          console.log('this is total xp ', xp, '--total xp--', totalxp, '---battlepass.xp--', battlepass.xp)
          xp = xp + battlepass.xp
          if (xp <= totalxp) {
            console.log('thisss more than levelllll ', xp, totalxp)
            const vaultDetails = await getUserVaultBy({ productId: battlepass.rewardFree, userId })
            if (!vaultDetails) {
              console.log('went inside vault deetails')
              const userVaultInterface: UserVaultInterface = {
                id: uuid(),
                userId,
                productId: battlepass.rewardFree,
                active: true,
                favorite: false,
              }
              await this.userVaultRepository.save(userVaultInterface)
            }
            if (getActivitiesDetails) {
              const vaultDetails = await getUserVaultBy({ productId: battlepass.rewardPaid, userId })
              if (!vaultDetails) {
                const userVaultInterface: UserVaultInterface = {
                  id: uuid(),
                  userId,
                  productId: battlepass.rewardPaid,
                  active: true,
                  favorite: false,
                }
                await this.userVaultRepository.save(userVaultInterface)
              }
            }
          } else break
        }
      }
    }
    return { message: 'user activity updated' }
  }

  async getUserActivities(userId: string) {
    const userActivities = await getUserActivitiesBy({ userId })
    return { data: userActivities }
  }

  async getUserActivityStatus(userId: string) {
    console.log('-----------------', userId)
    const battlepassDetails = await getBassPassDetails()
    console.log('-----------------', battlepassDetails)
    const totalXP = await getTotalXP(userId, ActivitiesTypeEnum.completedActivity)
    let xp = 0
    for (const battlepass of battlepassDetails) {
      xp = xp + battlepass.xp
      if (xp <= totalXP) {
        battlepass.levelCompleted = true
      } else battlepass.levelCompleted = false
    }
    const getActivitiesDetails: any = await getActivitiesBy({})
    for (const activity of getActivitiesDetails) {
      const activityDetails = await getActivityList(userId, activity.productId, activity.activityType)
      if (activity.noOfTimes <= activityDetails) {
        activity.completed = true
      } else activity.completed = false
    }
    return { data: { battlepassDetails, activityDetails: getActivitiesDetails } }
  }

  async myVault(userId: string) {
    const vaultDetails = await getUserVaultsBy({ userId })
    return { data: vaultDetails }
  }
}
