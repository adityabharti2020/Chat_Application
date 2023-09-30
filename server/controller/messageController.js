const Message = require("./../model/messageModel");
const User = require("./../model/userModel");
const Chat = require("./../model/chatModel");

//Create Message
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    if (!chatId || !content) {
      return res.status(401).json({
        message: "Please fill all details",
      });
    }
    const messageData = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    let createMsg = await Message.create(messageData);
    createMsg = await createMsg.populate("sender", "name");
    createMsg = await createMsg.populate("chat");
    createMsg = await User.populate(createMsg, {
      path: "chat.users",
      select: "name email image",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMsg: createMsg,
    });
    res.status(201).json(createMsg);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.allMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const getAllMsgs = await Message.find({ chat: chatId })
      .populate("sender", "name email image")
      .populate("chat");

    // console.log({ getAllMsgs });
    if (!getAllMsgs) {
      return res.staus(404).json({
        message: "Message Not found",
      });
    }

    res.status(200).json({
      status: "success",
      getAllMsgs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
