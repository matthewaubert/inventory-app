const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { encode } = require('he');
const { sanitizePrice, sanitizeQty } = require('../utils/util');

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
  // get all items
  const allItems = await Item.find({}, 'name price').sort({ name: 1 }).exec();

  res.render('item-list', {
    title: 'All Items',
    itemList: allItems,
  });
});

// display detail page for a specific Item
exports.itemDetail = asyncHandler(async (req, res, next) => {
  // get item w/ `_id` that matches `req.params.id`
  const item = await Item.findById(req.params.id).populate('category').exec();

  if (!item) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item-detail', { title: item.name, item });
});

// display Item create form on GET
exports.itemCreateGet = asyncHandler(async (req, res, next) => {
  // get all categories and items in parallel
  const [allCategories, allItems] = await Promise.all([
    Category.find().sort({ name: 1 }).exec(),
    Item.find().sort({ name: 1 }).exec(),
  ]);

  res.render('item-create', {
    title: 'Create Item',
    categoryList: allCategories,
    itemList: allItems,
  });
});

// handle Item create on POST
exports.itemCreatePost = [
  // validate and sanitize fields
  body('name', 'Name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),
  body('category', 'Category must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),
  body('price')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Price must not be empty.')
    .isNumeric()
    .withMessage('Price must be a number.')
    .customSanitizer((value) => encode(value))
    .customSanitizer((price) => sanitizePrice(price)), // format price for DB
  body('quantity')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Quantity must not be empty.')
    .isNumeric()
    .withMessage('Quantity must be a number.')
    .customSanitizer((value) => encode(value))
    .customSanitizer((qty) => sanitizeQty(qty)), // format qty for DB
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),

  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract validation errors from a request
    const errors = validationResult(req);

    // create an Item object w/ escaped and trimmed data
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    // if errors, render form again w/ sanitized values / error msgs
    if (!errors.isEmpty()) {
      // get all categories and items in parallel
      const [allCategories, allItems] = await Promise.all([
        Category.find().sort({ name: 1 }).exec(),
        Item.find().sort({ name: 1 }).exec(),
      ]);

      console.log(errors.array());

      res.render('item-create', {
        title: 'Create Item',
        categoryList: allCategories,
        itemList: allItems,
        item,
        errors: errors.array(),
      });
    } else {
      // data from form is valid. Save Item and redirect to Item page.
      await item.save();
      res.redirect(item.url);
    }
  }),
];

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
