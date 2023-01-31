import { ObjectType, EntitySchema, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'
export function getSingleBy<T = any>(
  table: ObjectType<T> | EntitySchema<T>
): (filter: Partial<T>, columns?: any[], sortings?) => Promise<T> {
  return async (filter, columns?, sortings?) => {
    const condition: any = {
      where: filter,
    }
    if (columns?.length > 0) {
      condition.select = columns
    }
    if (sortings) {
      condition.order = sortings
    }
    return await getRepository(table).findOne(condition)
  }
}

export function getManyBy<T = any>(
  table: ObjectType<T> | EntitySchema<T>
): (filter: Partial<T>, columns?: any[], sortings?) => Promise<T[]> {
  return async (filter, columns?, sortings?) => {
    const condition: any = { where: filter }
    if (columns?.length > 0) {
      condition.select = columns
    }
    if (sortings) {
      condition.order = sortings
    }
    return await getRepository(table).find(condition)
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export abstract class CreatedModified {
  @CreateDateColumn()
  created!: Date

  @UpdateDateColumn()
  modified!: Date
}

export const defaultDomain = 'battlepass.com'
