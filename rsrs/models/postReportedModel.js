const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    reportedPostId: { type: String, required: true },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Post',postSchema);