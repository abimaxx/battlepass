export interface ProductInterface {
  id: string
  image: string
  type: ProductTypeEnum
  name: string
}

export enum ProductTypeEnum {
  skin = 1,
  spray = 2,
  emote = 3,
}
