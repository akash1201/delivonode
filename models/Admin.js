const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = mongoose.Schema(
  {
    firstName: {
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
    phoneNo: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    distanceFee: {
      type: Number,
      default: 0,
    },
    baseFare: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
