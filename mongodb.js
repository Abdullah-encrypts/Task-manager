const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

async function run() {
  try {
    const client = await MongoClient.connect(connectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Successfully!");
    const db = client.db(databaseName);

    try {
      const user = await db
        .collection("tasks")
        .findOne({ _id: new ObjectId("6694f3a542c55de6fcad3b79") });
      console.log(user);
    } catch (error) {
      console.error("Error finding task by ID:", error);
    }

    try {
      const users = await db
        .collection("tasks")
        .find({ completed: false })
        .toArray();
      console.log(users);
    } catch (error) {
      console.error("Error finding tasks:", error);
    }

    client.close();
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}

run();
