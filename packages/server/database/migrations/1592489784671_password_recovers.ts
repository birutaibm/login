import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PasswordRecovers extends BaseSchema {
  protected tableName = 'password_recovers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('token').primary()
      table.string('username').notNullable()
      table.string('email', 255).notNullable()

      /**
       * "useTz: true" utilizes timezone option in PostgreSQL and MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
