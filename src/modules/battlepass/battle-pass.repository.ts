import { EntityRepository, getConnection, Repository } from 'typeorm'

import { getManyBy, getSingleBy } from '../../helpers'
import { BattlePass, BattlePassDetails, RewardDetails } from './battle-pass.entity'

export const getBattlePassBy = getSingleBy(BattlePass)

export const getBattlePassesBy = getManyBy(BattlePass)

export const getBattlePassDetailBy = getSingleBy(BattlePassDetails)

export const getBattlePassDetailsBy = getManyBy(BattlePassDetails)

export const getRewardDetailBy = getSingleBy(RewardDetails)

export const getRewardDetailsBy = getManyBy(RewardDetails)
@EntityRepository(BattlePass)
export class BattlePassRepository extends Repository<BattlePass> {}

@EntityRepository(BattlePassDetails)
export class BattlePassDetailsRepository extends Repository<BattlePassDetails> {}

@EntityRepository(RewardDetails)
export class RewardDetailsRepository extends Repository<RewardDetails> {}

export async function getBassPassDetails() {
  const sql = `
    SELECT
        "battle_pass_details".*  
    FROM
      "battle_pass"
    JOIN
      "battle_pass_details"
    ON
      "battle_pass_details"."battlePassId" = "battle_pass"."id"
    WHERE
        "battle_pass"."startDate" <  NOW()
    AND 
        "battle_pass"."endDate" > NOW()
    ORDER BY
        "battle_pass_details"."level" ASC
    `
  const result = await getConnection().query(sql, [])
  return result
}
