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


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'abc123'}, 'DravenRules!', {expiresIn:'7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'DravenRules!')
//     console.log(data)
// }

// myFunction()