import Mongoose from "mongoose";
import JWT from "jsonwebtoken";

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: [true, "Email Already Exists"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [3, "Password must be at least 3 Characters"],
  },
});
//Token for Authorization JWT
// userSchema.methods.genrateToken = function () {
//   return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "10d",
//   });
// };

export const userModel = Mongoose.model("Users", userSchema);
export default userModel;
