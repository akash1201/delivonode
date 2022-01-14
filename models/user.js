import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Address = mongoose.Schema(
  {
    phoneNo: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, },
    city: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    longitude : {type : String, required : true},
    latitude : { type : String, required : true}
  }
);


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone : {
      type : Number,
      required : true,
      unique: true
    },
    password: {
      type: String,
    },
    userType: {
      type: [String],
      required: true,
      default: ["customer"],
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
