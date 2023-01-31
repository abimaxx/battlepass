import { ActivitiesTypeEnum } from 'modules/activities/activites.interface'
import { EntityRepository, getConnection, Repository } from 'typeorm'

import { getManyBy, getSingleBy } from '../../helpers'
import { UserActivities, Users, UserVault } from './user.entity'

export const getUserBy = getSingleBy(Users)

export const getUsersBy = getManyBy(Users)

export const getUserActivityBy = getSingleBy(UserActivities)

export const getUserActivitiesBy = getManyBy(UserActivities)

export const getUserVaultBy = getSingleBy(UserVault)

export const getUserVaultsBy = getManyBy(UserVault)
@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}

@EntityRepository(UserActivities)
export class UserActivitiesRepository extends Repository<UserActivities> {}

@EntityRepository(UserVault)
export class UserVaultRepository extends Repository<UserVault> {}

export async function getActivityList(userId: string, productId: string, activityType: ActivitiesTypeEnum) {
  // const sql = `
  //     SELECT
  //       COUNT(*)
  //     FROM
  //       "user_activities"
  //     JOIN
  //       "activities"
  //     ON
  //       "activities"."productId" = "user_activities"."referenceId"
  //     WHERE
  //       "user_activities"."userId" = $1
  //     AND
  //       "activities"."productId" = $2
  //     AND
  //       "activities"."activityType" = $3
  //     AND
  //       "user_activities"."referenceId" NOT IN (SELECT "a"."id" FROM "activities" as "a")
  //     GROUP BY
  //       "user_activities"."ActivitiesType"
  //     `
  const sql = `
  SELECT
    COUNT(*) 
  FROM
    "user_activities"
  JOIN
    "activities"
  ON
    "activities"."productId" = "user_activities"."referenceId"
  WHERE
    "user_activities"."userId" = $1 
  AND 
    "activities"."productId" = $2
  AND 
    "activities"."activityType" = $3
  `
  // AND
  // "user_activities"."referenceId" NOT IN (SELECT "a"."id" FROM "activities" as "a")
  // GROUP BY
  // "user_activities"."ActivitiesType"
  const [result] = await getConnection().query(sql, [userId, productId, activityType])
  return result.count
}

export async function getTotalXP(userId: string, activityType: ActivitiesTypeEnum) {
  const sql = `
  SELECT
    SUM("activities"."rewardXP") as "totalXP"
  FROM
    "user_activities"
  JOIN
    "activities"
  ON
    "activities"."id" = "user_activities"."referenceId"
  WHERE
    "user_activities"."userId" = $1 
  AND 
    "user_activities"."ActivitiesType" = $2
  `
  console.log('userId, activityType ', userId, activityType)
  const [result] = await getConnection().query(sql, [userId, activityType])
  console.log(result)
  return result.totalXP
}
