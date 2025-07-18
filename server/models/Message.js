const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    dialog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dialog',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
