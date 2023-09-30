const Chat = require("./../model/chatModel");
const User = require("./../model/userModel");

exports.createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check Chat is already exits or not
    let isChat = await Chat.find({
      is_groupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "-password")
      .populate("latestMsg");

    isChat = await User.populate(isChat, {
      path: "latestMsg.sender",
      select: "name email image",
    });
    if (!isChat) {
      return res.status(404).json({
        message: "There is no chat",
      });
    }
    const createdChat = await Chat.create({
      chatName: "sender",
      is_groupChat: false,
      users: [req.user._id, userId],
    });
    const fullChat = await Chat.find({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    res.status(201).json({
      status: "success",
      data: { fullChat },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getChat = async (req, res) => {
  try {
    let findChat = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMsg")
      .sort({ updated: -1 });

    findChat = await User.populate(findChat, {
      path: "latestMsg.sender",
      select: "name email image",
    });

    res.status(200).json({
      status: "success",
      findChat,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createGroupChat = async (req, res) => {
  try {
    const { chatName, users } = req.body;
    if (!chatName || !users || users.length < 2) {
      return res.status(400).json({
        message: "Please provide all details.More than 2 users are required",
      });
    }

    const createChatGroup = await Chat.create({
      chatName,
      users: [...users, req.user],
      groupAdmin: req.user,
      is_groupChat: true,
    });

    const fullGroupChat = await Chat.findOne({ _id: createChatGroup._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(201).json({
      status: "success",
      message: "Chat Group created successfully",
      fullGroupChat,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.renameGroup = async (req, res) => {
  try {
    const { chatName, chatId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true, runValidators: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Chat Update Successfully",
      data: updatedChat,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeGroup = async (req, res) => {
  try {
    const { chatId } = req.body;

    const findChatId = await Chat.findById(chatId);
    if (!findChatId) {
      return res.status(400).json({ message: "Chat is not fond" });
    }

    const removeChatFromGroup = await Chat.findByIdAndDelete(findChatId);
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addToGroup = async (req, res) => {
  try {
    const { userId, chatId } = req.body;

    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true, runValidators: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    console.log({ added });
    if (!added) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json({ message: "Add sucessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
