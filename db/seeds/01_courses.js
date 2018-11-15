const tableName = 'courses'

  exports.seed = knex => {
    return knex(tableName).insert([ //insert the data that we want to use
      { id: 1, name: 'Web Development Immersive', price: 21000 },
      { id: 2, name: 'Data Science Immersive', price: 16000 },
      { id: 3, name: 'Front End Web Development', price: 3000 },
      { id: 4, name: 'Web Development Foundations', price: 900 },
      { id: 5, name: 'Data Analytics Track', price: 5000 },
      // What is the cost of the course below? 0 as the default in the student table is set to 0.
      { id: 6, name: 'Learn to Code' }
    ]).then(() => {
      // What is the purpose of this line? 
      //.raw allows you to type in actual SQL. It selects the max ID from the table so that the incremental sequence table knows where to pick up from. 
      //eg start at 7 for next entry. Would not be needed if we didn't specify ID.
      // How does it work?
      // What would happen if you *did not* include this? Your database would break on the next insert as it would try to insert something with an id of 1.
      return knex.raw(`SELECT setval('${tableName}_id_seq', (SELECT MAX(id) FROM ${tableName}));`)
    })
  }