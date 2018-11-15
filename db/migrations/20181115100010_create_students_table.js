exports.up = knex => {
    // What would happen if you don't `return` here? Returns a promise, wouldn't do anything if not returned.
    return knex.schema.createTable('courses', table => {
      // What is table.increments()? Creates an "id" that increments each time.
      table.increments()
      table.string('name') //Creates a column called name that looks for a string input.
      table.integer('price').notNullable().defaultsTo(0) //Creates a column called price that looks for an integer input. Cannot be null and defaults to 0 if no input.
      // What is table.timestamps()? Tells the table to set a timestamp for individual calls and inserts.
      // Why do we give it the values true and true? The first true is to tell it to use timestamps, the second timestamp is to always use the current time.
      table.timestamps(true, true)
    })
  }
  
  // What is exports.down? Used to drop a table when you're done with the data.
  exports.down = knex => {
    return knex.schema.dropTable('courses')
  }