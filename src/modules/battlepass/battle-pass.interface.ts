export interface BattlePassInterface {
  id: string
  name: string
  startDate: Date
  endDate: Date
}

export interface BattlePassDetailsInterface {
  id: string
  battlePassId: string
  level: number
  xp: number
  rewardPaid: string
  rewardFree: string
}

export interface rewardDetailsInterface {
  id: string
  reward: string
  rewardType: RewardTypeEnum
}

export enum RewardTypeEnum {
  product = 1,
  xp = 2,
}
