module.exports = {
  async up(db) {
    await db.createCollection('employees');
    await db.collection('employees').insertMany([
      {
        FirstName: "John",
        LastName: "Doe",
        Age: 30,
        Salary: 50000
      },
      {
        FirstName: "Jane",
        LastName: "Smith",
        Age: 28,
        Salary: 60000
      }
    ]);
  },

  async down(db) {
    await db.collection('employees').drop();
  }
};
