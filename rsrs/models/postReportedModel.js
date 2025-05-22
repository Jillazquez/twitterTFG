const mongoose = require('mongoose');

const reportedPostSchema = new mongoose.Schema({
  reportedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

reportedPostSchema.index({ reportedPost: 1, reporter: 1 }, { unique: true });

module.exports = mongoose.model('ReportedPost', reportedPostSchema);
