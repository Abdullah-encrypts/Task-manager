require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("6699ea9c02b8961bc96fc612")
//   .then(() => {
//     return Task.countDocuments({ completed: "false" });
//   })
//   .then((result) => {
//     console.log("Total incomplete tasks are: ", result);
//   }).catch((e)=>{
//     console.log(e)
//   });

const deleteTaskAndCount = async (id) => {
  const result = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({completed: false});
  return count;
};

deleteTaskAndCount("6699ea9c02b8961bc96fc612").then((count) => {
  console.log(count);
}).catch((e)=> {
  console.log(e);
});
