const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

async function run() {
  try {
    const client = await MongoClient.connect(connectionURL);
    console.log("Connected Successfully!");
    const db = client.db(databaseName);

    // db.collection("users")
    //   .insertMany([{
    //     name: 'Abdullah',
    //     age: 21
    //   }, {
    //     name: 'Ahsan',
    //     age: 25
    //   }])
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .deleteOne({
        description: "have 4 glasses of water",
      })
      .then((result) => {
        console.log("Successfully deleted!", result);
      })
      .catch((e) => {
        "Some Issue here!", e;
      });

    setTimeout(() => {
      client.close();
    }, 2000);
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}

run();
