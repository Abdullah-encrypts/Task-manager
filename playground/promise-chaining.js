require("../src/db/mongoose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("66968320a1c2318837295d6c", { age: 18 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 18 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("6699e61081beb6561db1d9a9", 21).then((result) => {
  console.log("result ", result);
}).catch((e)=> {
  console.log("THis is an ERRRORRRRR", e)
});
