export interface ActivitiesInterface {
  id: string
  productId: string
  activityType: ActivitiesTypeEnum
  rewardXP: number
  noOfTimes: number
}

export enum ActivitiesTypeEnum {
  like = 1,
  favorite = 2,
  others = 3,
  completedActivity = 4,
  boughtPass = 5,
}
