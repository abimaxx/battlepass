import { EntityRepository, Repository } from 'typeorm'

import { getManyBy, getSingleBy } from '../../helpers'
import { Activities } from './activites.entity'

export const getActivityBy = getSingleBy(Activities)

export const getActivitiesBy = getManyBy(Activities)
@EntityRepository(Activities)
export class ActivitesRepository extends Repository<Activities> {}
