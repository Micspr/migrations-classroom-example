# Knex Migrations & Seeds

### Objectives

- [ ] Specify `migrations/` and `seeds/` folders in your `knexfile.js`
- [ ] Add a `knex` script
- [ ] Run and rollback your migrations
- [ ] Create complex tables using a migrations
- [ ] Create seed files and repeatably run them in order
- [ ] Describe the purpose of migrations and seeds

## Example Repository

We will use the following [migrations-classroom-example](https://github.com/bwreid/migrations-classroom-example) repository while learning migrations and seeds. Follow the instructions to get the project up and running.

## Guiding Questions

* What does adding the `directory` key in the `knexfile.js` do? Why is this useful?

  > Sets a file path for knex to reference. This allows the database to work and set files with no errors.

* In your `package.json`, add a script that looks like the following. Why is it useful to do so?
  ```json
  {
    "knex": "knex"
  }
  ```
  
  > Allows you to use command line interface tools with Knex without having to write an excessively long intro script.
  
* Try running the following command to create a migration. What does the long string of numbers represent in the file that is created?
  ```bash
  npm run knex migrate:make create_courses_table
  ```
  
  > It sets a timestamp of year/month/day/hour/minute/second format.
  
* What is a database migration and why should you use them?

  > Its a schema migration to allow version control and revisions of the database.

* Add the following to your migration and answer the inline questions. What command will run all the most recent migrations?
  ```js
  exports.up = knex => {
    // What would happen if you don't `return` here?
    return knex.schema.createTable('courses', table => {
      // What is table.increments()?
      table.increments()
      table.string('name')
      table.integer('price').notNullable().defaultsTo(0)
      // What is table.timestamps()?
      // Why do we give it the values true and true?
      table.timestamps(true, true)
    })
  }

  // What is exports.down?
  exports.down = knex => {
    return knex.schema.dropTable('courses')
  }
  ```

  > See file for answers. Run ```npm run knex migrate:latest``` to push a migration and create a table. 
  > Run ```npm run knex migrate:make (table_name)``` to create a new table. You can view active tablets through psql \dt

* What is the `knex` command to rollback changes to a table and why would you do so?

  > ```npm run knex migrate:rollback``` in the CLI will rollback one migration. Rollback will look at the timestamps and intelligently rollback per timestamp. This allows you to control which version of information you want to use.

* What is the `knex` command to create a seed file? What is the difference between migrations and seeds? Which are related to your production application and which are related to your development application?

  > ```npm run knex seed:make seed_name``` Migrations create the schema/structure (tables) and seeds populate those tables. Migrations are for testing and production as your structure should be the same for both. Seeds are mostly just for test data in production.
  
* Create a new seed file called `01_courses` and then add the following to it, answer the provided questions. Why is it useful for us in this case to decide what the IDs will be?
  ```js
  const tableName = 'courses'

  exports.seed = knex => {
    return knex(tableName).insert([
      { id: 1, name: 'Web Development Immersive', price: 21000 },
      { id: 2, name: 'Data Science Immersive', price: 16000 },
      { id: 3, name: 'Front End Web Development', price: 3000 },
      { id: 4, name: 'Web Development Foundations', price: 900 },
      { id: 5, name: 'Data Analytics Track', price: 5000 },
      // What is the cost of the course below?
      { id: 6, name: 'Learn to Code' }
    ]).then(() => {
      // What is the purpose of this line?
      // How does it work?
      // What would happen if you *did not* include this?
      return knex.raw(`SELECT setval('${tableName}_id_seq', (SELECT MAX(id) FROM ${tableName}));`)
    })
  }
  ```

  > IDs are specified in this case so that it is easier to know exactly what the IDs are for further use. It's generally a best practice to not specify IDs and let the database choose. Since these IDs start at 1 and increment, the auto generated and specified IDs would be the same.
  
* Try running the command that runs the seed files again. What error do we get and why?

  > Run ```npm run knex seed:run``` to run the seeds through the CLI. If we try to run it again we get a duplicate key error because the keys are hardcoded.

* In your `main.js` file, change the current request so that it selects all courses and log out the result. What two columns were created that we did not specify?

  > The timestamp files are generated and not provided by us.
  
* Let's create a new migration that is related to our `courses` table. Create a new migration titled `create_students_table` with the content from below. How could we add an `ON DELETE CASCADE` constraint?
  ```js
  exports.up = knex => {
    return knex.schema.createTable('students', table => {
      table.increments()
      table.string('preferred_name').notNullable()
      table.string('surname').notNullable()
      table.string('github_username')

      table.integer('course_id')
      table.foreign('course_id').references('courses.id')

      table.timestamps(true, true)
    })
  }

  exports.down = knex => {
    return knex.schema.dropTable('students')
  }
  ```
  
  > ```npm run knex migrate:make create_students_table``` Add ```.onDelete('CASCADE')``` to the references line.

* Run that migration and then create a seeds file with the name `02_students`. Use the content below for the file. When we run the seed command, it runs all the files in the `seeds/` folder in order which is why it currently fails. Which table should we delete so that we can consistently run the seed command?
  ```js
  const tableName = 'students'

  exports.seed = knex => {
    return knex(tableName).insert([
      { id: 1, preferred_name: 'Elizabeth', surname: 'Reeves', github_username: 'Elizabeth_Reeves', course_id: 1 },
      { id: 2, preferred_name: 'Karla', surname: 'Palmer', github_username: 'Karla_Palmer', course_id: 1 },
      { id: 3, preferred_name: 'Marlene', surname: 'Mendez', github_username: 'Marlene_Mendez', course_id: 1 },
      { id: 4, preferred_name: 'Mercedes', surname: 'Cook', github_username: 'Mercedes_Cook', course_id: 1 },
      { id: 5, preferred_name: 'Miriam', surname: 'Higgins', github_username: 'Miriam_Higgins', course_id: 1 },
      { id: 6, preferred_name: 'Ronald', surname: 'Fuller', github_username: 'Ronald_Fuller', course_id: 1 },
      { id: 7, preferred_name: 'Tracey', surname: 'Cannon', github_username: 'Tracey_Cannon', course_id: 1 },
      { id: 8, preferred_name: 'Joel', surname: 'Hudson', github_username: 'Joel_Hudson', course_id: 1 },
      { id: 9, preferred_name: 'Kristy', surname: 'Howell', github_username: 'Kristy_Howell', course_id: 1 },
      { id: 10, preferred_name: 'Sammy', surname: 'Reynolds', github_username: 'Sammy_Reynolds', course_id: 2 },
      { id: 11, preferred_name: 'Marjorie', surname: 'Wolfe', github_username: 'Marjorie_Wolfe', course_id: 2 },
      { id: 12, preferred_name: 'Lance', surname: 'Owen', github_username: 'Lance_Owen', course_id: 2 },
      { id: 13, preferred_name: 'David', surname: 'Stevenson', github_username: 'David_Stevenson', course_id: 2 },
      { id: 14, preferred_name: 'Wilson', surname: 'Austin', github_username: 'Wilson_Austin', course_id: 2 },
      { id: 15, preferred_name: 'Tammy', surname: 'Peterson', github_username: 'Tammy_Peterson', course_id: 2 },
      { id: 16, preferred_name: 'Hope', surname: 'Collier', github_username: 'Hope_Collier', course_id: 2 },
      { id: 17, preferred_name: 'Debra', surname: 'Rodriquez', github_username: 'Debra_Rodriquez', course_id: 2 },
      { id: 18, preferred_name: 'Bonnie', surname: 'Alexander', github_username: 'Bonnie_Alexander', course_id: 2 },
      { id: 19, preferred_name: 'Carol', surname: 'Kim', github_username: 'Carol_Kim', course_id: 3 },
      { id: 20, preferred_name: 'Cecelia', surname: 'Norton', github_username: 'Cecelia_Norton', course_id: 3 },
      { id: 21, preferred_name: 'Vera', surname: 'Estrada', github_username: 'Vera_Estrada', course_id: 3 },
      { id: 22, preferred_name: 'Olivia', surname: 'Dawson', github_username: 'Olivia_Dawson', course_id: 3 },
      { id: 23, preferred_name: 'Brooke', surname: 'Cruz', github_username: 'Brooke_Cruz', course_id: 3 },
      { id: 24, preferred_name: 'Grady', surname: 'Rodgers', github_username: 'Grady_Rodgers', course_id: 3 },
      { id: 25, preferred_name: 'Lela', surname: 'Gonzalez', github_username: 'Lela_Gonzalez', course_id: 3 },
      { id: 26, preferred_name: 'Luis', surname: 'Robertson', github_username: 'Luis_Robertson', course_id: 3 },
      { id: 27, preferred_name: 'Kelli', surname: 'Torres', github_username: 'Kelli_Torres', course_id: 3 },
      { id: 28, preferred_name: 'Florence', surname: 'Barnes', github_username: 'Florence_Barnes', course_id: 4 },
      { id: 29, preferred_name: 'Wilbur', surname: 'Wells', github_username: 'Wilbur_Wells', course_id: 4 },
      { id: 30, preferred_name: 'Constance', surname: 'Schultz', github_username: 'Constance_Schultz', course_id: 4 },
      { id: 31, preferred_name: 'Jackie', surname: 'Vega', github_username: 'Jackie_Vega', course_id: 4 },
      { id: 32, preferred_name: 'Walter', surname: 'McCarthy', github_username: 'Walter_McCarthy', course_id: 4 },
      { id: 33, preferred_name: 'Molly', surname: 'Ward', github_username: 'Molly_Ward', course_id: 4 },
      { id: 34, preferred_name: 'Celia', surname: 'Watson', github_username: 'Celia_Watson', course_id: 4 },
      { id: 35, preferred_name: 'Dora', surname: 'Herrera', github_username: 'Dora_Herrera', course_id: 4 },
      { id: 36, preferred_name: 'Eva', surname: 'Burton', github_username: 'Eva_Burton', course_id: 4 },
      { id: 37, preferred_name: 'Kelley', surname: 'Banks', github_username: 'Kelley_Banks', course_id: 4 },
      { id: 38, preferred_name: 'Doris', surname: 'Valdez', github_username: 'Doris_Valdez', course_id: 4 },
      { id: 39, preferred_name: 'Levi', surname: 'Frazier', github_username: 'Levi_Frazier', course_id: 4 },
      { id: 40, preferred_name: 'Marty', surname: 'Miles', github_username: 'Marty_Miles', course_id: 5 },
      { id: 41, preferred_name: 'Leo', surname: 'Jenkins', github_username: 'Leo_Jenkins', course_id: 5 },
      { id: 42, preferred_name: 'Monica', surname: 'Blair', github_username: 'Monica_Blair', course_id: 5 },
      { id: 43, preferred_name: 'Elaine', surname: 'Newman', github_username: 'Elaine_Newman', course_id: 5 },
      { id: 44, preferred_name: 'Dana', surname: 'Simpson', github_username: 'Dana_Simpson', course_id: 5 },
      { id: 45, preferred_name: 'Hattie', surname: 'Romero', github_username: 'Hattie_Romero', course_id: 5 },
      { id: 46, preferred_name: 'Natasha', surname: 'Lawson', github_username: 'Natasha_Lawson', course_id: 6 },
      { id: 47, preferred_name: 'Kyle', surname: 'Gonzales', github_username: 'Kyle_Gonzales', course_id: 6 },
      { id: 48, preferred_name: 'Kelly', surname: 'Graham', github_username: 'Kelly_Graham', course_id: 6 },
      { id: 49, preferred_name: 'Angie', surname: 'Nunez', github_username: 'Angie_Nunez', course_id: 6 },
      { id: 50, preferred_name: 'Armando', surname: 'Jones', github_username: 'Armando_Jones', course_id: 6 },
    ]).then(() => {
      return knex.raw(`SELECT setval('${tableName}_id_seq', (SELECT MAX(id) FROM ${tableName}));`)
    })
  }
  ```
  
  > ```npm run knex seed:make 02_students``` Both tables will need to be deleted using the 00_drop file. See file for logic.
  
* Create a new seed file called `00_drop.js`. In it, delete tables so that your seeds can successfully run.

  > ```npm run knex seed:make 00_drop```

Finally, try running some `knex` queries on your existing data in the `main.js` file.