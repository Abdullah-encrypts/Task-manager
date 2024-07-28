const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// taskSchema.pre("save", async function (next) {
//   const task = this;

//   console.log("Just in the task running...");
//   next();
// });

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
