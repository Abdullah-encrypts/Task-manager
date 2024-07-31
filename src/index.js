const express = require("express");
require("./db/mongoose");
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express();
const port = process.env.port || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//   next()
// }})

// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. Check back soon!");
// })

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log("Server is up and running on port ", port);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => { 
    // const task = await Task.findById('66a900ce23b14b92ad30c32d');
    // await task.populate('owner'); // Directly await the populate method
    // console.log(task.owner);

    // const user = await User.findById('66a8f333c3c6be179944ab9f')
    // await user.populate('tasks')
    // console.log(user.tasks)
}

main();
