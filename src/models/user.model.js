import mongoose from "mongoose";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "user already exits, choose another one."],
    trim: true,
    required: [true, "email is required."],
    lowerCase: true,
    match: [emailRegex, "enter a valid email."],
  },
  name: {
    type: String,
    required: [true, "name is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
    minLength: [6, "password should be more than six character"],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

export default User;
