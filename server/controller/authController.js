const User = require("../model/userModel");
const sendEmail = require("./../util/email");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/appError");
const otpGenerator = require("otp-generator");
const { promisify } = require("util");
const multer = require("multer");
const path = require("path");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
const sendToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// const multerStorage = multer.diskStorage();
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, "Images", true);
//   } else {
//     cb(res.status(400).json("NOt an image, Please upload a image"), false);
//   }
// };

// const upload = multer({
//   staorage: multerStorage,
//   fileFilter: multerFilter,
// });

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, "Images", true);
    } else {
      cb(res.status(400).json("NOt an image, Please upload a image"), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: multerStorage,
});

exports.uploadImage = upload.single("image");

const createSendToken = (user, statusCode, res, opt) => {
  const token = sendToken(user._id);

  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("bearerToken", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    message: opt,
    data: {
      token,
      user,
    },
  });
};
// Authentication
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.cookie && req.headers.cookie.startsWith("bearer")) {
      token = req.headers.cookie.split("=")[1];
      // console.log({ token });
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Token not found",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );
    // console.log({ decoded: decoded });
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "Fail",
        message: "The user belongs to this token does not exists",
      });
    }

    if (currentUser.changePasswordAfter(decoded.iat)) {
      return res.status(400).json({
        status: "fail",
        message: "User recently change password, please logIn again",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.auth = async (req, res) => {
  res.json({
    status: "success",
    message: "User is authenticated",
    user: req.user,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password, phone, passwordConfirm, image, bio } =
    req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Please fill all details" });
  }
  if (!password || !passwordConfirm) {
    return res.status(400).json({ message: "Password are not same" });
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const message = `OTP for account verification ${otp}`;
  try {
    await sendEmail({
      email: req.body.email,
      subject: "Otp valid for 10 min",
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
  const existUser = await User.exists({ email });
  if (existUser) {
    return res.status(500).json({
      message: "Email already used",
    });
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    otpToken: parseInt(otp),
    image,
    bio,
  });

  createSendToken(user, 201, res);
});

exports.signUpVerification = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user.is_verified) {
    return res.status(400).json({
      message: "Otp already verified",
    });
  }

  if (user.otpToken === parseInt(req.body.otp)) {
    (user.otpToken = undefined), (user.is_verified = true);
    await user.save();
  } else {
    return res.status(401).json({
      status: "fail",
      message: "OTP didn't matched",
    });
  }
  createSendToken(user, 200, res, "OTP verified");
});

// LogIn
exports.logIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(400).json({
      status: "fail",
      message: "Email and Password incorrect",
    });
  }

  createSendToken(user, 200, res);
});

// Log Out
exports.logOut = (req, res) => {
  res.clearCookie("bearerToken");

  res.status(200).json({ message: "Logged Out successfull" });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Update Password
exports.updateMyPassword = catchAsync(async (req, res) => {
  const user = await User.findById(res.user).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return res.status(400).json({ message: "Your Current password wrong" });
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
});

// Update Me
exports.updateMe = async (req, res) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return res
        .status(400)
        .json({ message: "This route is not for update password" });
    }
    const filterFields = filterObj(req.body, "name", "email", "phone", "image");
    // const filteredBody = filterObj(req.body, "name", "email");
    if (req.file) filterFields.image = req.file.filename;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filterFields,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Data update successfull",
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get All User

exports.getAllUser = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const getAllUserExceptCurrentUser = await User.find({
      _id: { $ne: currentUser._id },
    });

    const contactUserIds = getAllUserExceptCurrentUser.map((user) => user._id);

    // currentUser.contacts.push(...contactUserIds);

    // await currentUser.save();

    res.status(200).json({
      message: "Get All Users",
      data: { getAllUserExceptCurrentUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Add Friend

exports.addContact = async (req, res) => {
  try {
    const { addFriendId } = req.params;
    const addFriend = await User.findById(addFriendId);
    let message;
    // console.log({ addFriend });
    const currentUser = req.user;
    // console.log({ currentUser });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.contacts.includes(addFriend._id)) {
      currentUser.contacts.push(addFriend._id);
      await currentUser.save();
      message = "Contact add succssfully";
    } else {
      message = "Already added";
    }

    res.status(200).json({
      status: "Success",
      message: message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// View Contact Profile
exports.viewContactProfile = async (req, res) => {
  try {
    const userContact = await User.findById({ _id: req.user._id })
      .select("contacts")
      .populate("contacts", "name email");
    res.status(200).json({
      message: "Ok",
      data: {
        userContact,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
