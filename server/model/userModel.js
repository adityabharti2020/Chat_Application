const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 8,
      select: false,
      required: [true, "Please enter a password"],
    },
    phone: {
      type: Number,
      unique: true,
    },
    otpToken: {
      type: Number,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    bio: { type: String },
    image: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    passwordChangeAt: Date,
    passwordResetToken: Number,
    passwordResetTokenExpiresIn: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changeTimeStamp = parseInt(passwordChangeAt.getTime() / 1000, 10);
    return JWTTimestamp < changeTimeStamp;
  }
  return false;
};

// userSchema.methods.createPasswordResetToken = function (next) {
//   const resetToken = otpGenerator.generate(6, {
//     digits: true,
//     lowerCaseAlphabets: false,
//     upperCaseAlphabets: false,
//     specialChars: false,
//   });
//   console.log("resetToken", resetToken);
//   this.passwordResetToken = resetToken;
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };
const User = mongoose.model("User", userSchema);
module.exports = User;
