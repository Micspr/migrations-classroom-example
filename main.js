const db = require('./db')

db.raw(`SELECT 1 + 1 AS result`).then(() => {
  console.log(`✅ You are connected to your database.`)
}).catch(() => {
  console.log(`❌ Connection failed. Please make sure your database is created.`)
}).finally(db.destroy)
