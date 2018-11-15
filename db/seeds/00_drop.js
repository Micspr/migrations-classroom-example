
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del() //Best practice is to delete opposite of creation. Creation happens in order 00 > 01 > 02 etc So deletion should be reverse 02 > 01
    .then(() => {
      return knex('courses').del()
    })
};
