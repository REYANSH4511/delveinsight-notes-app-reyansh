const messageList = require("./message");

const getMessage = (messageCode) => {
  try {
    return messageList[messageCode];
  } catch (err) {
    console.log(err);
  }
};

module.exports = getMessage;
