const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connected to MongoDB");
    //
}
)
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  // For dropping db

//   async function dropDatabase() {
//     try {
//       await mongoose.connection.db.dropDatabase(); // Drops the database
//       console.log("Database dropped successfully");
//     } catch (error) {
//       console.error("Error dropping database:", error);
//     }
// }
// dropDatabase();