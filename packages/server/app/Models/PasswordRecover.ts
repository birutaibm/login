import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PasswordRecover extends BaseModel {
  @column({ isPrimary: true })
  public token: string

  @column()
  public email: string

  @column()
  public username: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
