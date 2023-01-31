import { Injectable } from '@nestjs/common'
import { ActivitesRepository as ActivitiesRepository } from './activites.repository'
import { uuid } from 'uuidv4'
import { ActivitiesInterface } from './activites.interface'
import { getProductBy } from 'modules/product/product.repository'
import { errors } from 'error'
import { CreateActivitesDTO } from './activites.dto'
// import { ReferenceTypeEnum, UserActivitiesInterface } from 'modules/user/user.interface'
// import { UserActivitiesRepository } from 'modules/user/user.repository'
// import { getRewardDetailBy } from 'modules/battlepass/battle-pass.repository'

@Injectable()
export class ActivitiesService {
  constructor(public readonly activitiesRepository: ActivitiesRepository) {}

  async addActivities({ productId, activityType, rewardXP, noOfTimes }: CreateActivitesDTO) {
    const productDetails = await getProductBy({ id: productId })
    if (!productDetails) throw errors.ProductNotFound
    const activitiesInterface: ActivitiesInterface = {
      id: uuid(),
      productId,
      activityType,
      rewardXP,
      noOfTimes,
    }

    await this.activitiesRepository.save(activitiesInterface)
    return { message: 'activits added' }
  }
}
