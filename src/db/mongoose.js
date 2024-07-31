const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api")
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