const mongoose = require('mongoose');
const { Schema } = mongoose;
const { getImgUrl } = require('../utils/cloudinary');

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imgId: { type: String },
});

// virtual for item's URL
ItemSchema.virtual('url').get(function () {
  return `/inventory/item/${this._id}`;
});

// virtual for item's image URL
ItemSchema.virtual('imgUrl').get(function () {
  return getImgUrl(this.imgId);
});

module.exports = mongoose.model('Item', ItemSchema);
