exports.up = knex => {
    return knex.schema.createTable('students', table => {
      table.increments()
      table.string('preferred_name').notNullable()
      table.string('surname').notNullable()
      table.string('github_username')
  
      table.integer('course_id')
      table.foreign('course_id').references('courses.id').onDelete('CASCADE')
  
      table.timestamps(true, true)
    })
  }
  
  exports.down = knex => {
    return knex.schema.dropTable('students')
  }