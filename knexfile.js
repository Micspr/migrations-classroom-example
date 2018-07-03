const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/migrations_classroom_example_dev',
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  },
}
