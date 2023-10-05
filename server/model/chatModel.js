const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    // chatName: {
    //   type: String,
    //   trim: true,
    // },
    // is_groupChat: {
    //   type: Boolean,
    //   default: false,
    // },
    // users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // groupAdmin: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // latestMsg: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Message",
    // },
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chats: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        chatMsg: {
          type: String,
          required: true,
        },
        msgTime: {
          type: Date,
          default: Date.now(),
        },
        isMsgDeleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
