const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
});

// virtual for category's URL
CategorySchema.virtual('url').get(function () {
  return `/inventory/category/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
