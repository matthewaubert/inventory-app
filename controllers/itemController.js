const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');

// display home page
exports.index = asyncHandler(async (req, res, next) => {
  // get details of items and categories in parallel
  const [numItems, allItems, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Item.find({}, 'quantity').exec(),
    Category.countDocuments({}).exec(),
  ]);

  const qtyItems = allItems.reduce((sum, item) => sum + item.quantity, 0);

  res.render('index', {
    title: 'OES Inventory',
    numItems,
    qtyItems,
    numCategories,
  });
});

// display list of all Items
exports.itemList = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item list');
});

// display detail page for a specific Item
exports.itemDetail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
});

// display Item create form on GET
exports.itemCreateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item create GET');
});

// handle Item create on POST
exports.itemCreatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item create POST');
});

// display Item delete form on GET
exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item delete GET');
});

// handle Item delete on POST
exports.itemDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item delete POST');
});

// display Item update form on GET
exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item update GET');
});

// handle Item update on POST
exports.itemUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item update POST');
});
