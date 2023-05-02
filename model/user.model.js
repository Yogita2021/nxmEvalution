const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  city: { type: String, require: true },
  age: { type: Number, require: true },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
// {
//   "name":"yogita",
//   "email":"yogita@gmail.com",
// "password":"yogita@123",
// "city":"pune",
// "age":25

// }
