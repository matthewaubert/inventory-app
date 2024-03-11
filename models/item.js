const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// virtual for item's URL
ItemSchema.virtual('url').get(function () {
  return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
