const Item = require('../models/item');
const Category = require('../models/category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { encode } = require('he');
const { sanitizePrice, sanitizeQty } = require('../utils/util');
const { upload } = require('../utils/multer-config');
const cloudinary = require('../utils/cloudinary');
const { unlink } = require('node:fs');

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
  const allItems = await Item.find()
    .populate('category')
    .sort({ name: 1 })
    .exec();

  res.render('item-list', {
    title: 'All Items',
    itemList: allItems,
  });
});

// display detail page for a specific Item
exports.itemDetail = asyncHandler(async (req, res, next) => {
  // get item w/ `_id` that matches `req.params.id`
  const item = await Item.findById(req.params.id).populate('category').exec();

  // if Item not found, throw error
  if (!item) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item-detail', { title: item.name, item });
});

// display Item create form on GET
exports.itemCreateGet = asyncHandler(async (req, res, next) => {
  // get all categories
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render('item-create', {
    title: 'Create Item',
    categoryList: allCategories,
  });
});

// validation & sanitization chain for Item create & update on POST
const validationChainCreateUpdate = [
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
];

// handle Item create on POST
exports.itemCreatePost = [
  // set `req.file` value to image
  // e.g. req.file = {
  //   fieldname: 'image',
  //   originalname: 'osprey-exos-55.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: './public/images/',
  //   filename: 'osprey-exos-55-1710465472296.jpeg',
  //   path: 'public/images/osprey-exos-55-1710465472296.jpeg',
  //   size: 97273,
  // };
  upload.single('image'),

  // validate and sanitize fields
  ...validationChainCreateUpdate,

  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    let imgId; // will be set to Cloudinary `public_id` or `null`
    // if user uploaded an image:
    if (req.file) {
      // upload file to Cloudinary and set `imgId` to Cloudinary `public_id`
      imgId = await cloudinary.uploadImg(req.file.path);
      // delete local image upload
      unlink(req.file.path, (err) => {
        if (err) console.error(err);
      });
    } else {
      // set `imgId` to null
      imgId = null;
    }

    // create an Item object w/ escaped & trimmed data
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      ...(imgId && { imgId }), // set value only if `imgId` is not falsy
    });

    // if errors, render form again w/ sanitized values & error msgs
    if (!errors.isEmpty()) {
      // if user uploaded an image, delete it from Cloudinary
      if (req.file) cloudinary.deleteImg(imgId);

      // get all categories
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      res.render('item-create', {
        title: 'Create Item',
        categoryList: allCategories,
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
  // get item w/ `_id` that matches `req.params.id`
  const item = await Item.findById(req.params.id).populate('category').exec();

  // if no results: redirect to Items list
  if (!item) res.redirect('/inventory/items');

  res.render('item-detail', { title: 'Delete Item', item, delete: true });
});

// handle Item delete on POST
exports.itemDeletePost = asyncHandler(async (req, res, next) => {
  // delete item and redirect to the list of items
  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect('/inventory/items');
});

// display Item update form on GET
exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
  // get Item, and all Categories in parallel
  const [item, allCategories] = await Promise.all([
    Item.findById(req.params.id).populate('category').exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  // if Item not found, throw error
  if (!item) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }

  res.render('item-create', {
    title: 'Update Item',
    categoryList: allCategories,
    item,
  });
});

// handle Item update on POST
exports.itemUpdatePost = [
  // set `req.file` value to `image`
  upload.single('image'),

  // validate and sanitize fields
  ...validationChainCreateUpdate,

  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    // get old item from database
    const oldItem = await Item.findById(req.params.id);
    let imgId; // will be set to Cloudinary `public_id` or `null`
    // if user uploaded an image:
    if (req.file) {
      // upload file to Cloudinary and set `imgId` to Cloudinary `public_id`
      imgId = await cloudinary.uploadImg(req.file.path);
      // delete local image upload
      unlink(req.file.path, (err) => {
        if (err) console.error(err);
      });
    } else {
      // if there's and old `imgId`: use that; else: set `imgId` to null
      imgId = oldItem.imgId ? oldItem.imgId : null;
    }

    // create an Item object w/ escaped & trimmed data
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      imgId: req.file?.filename,
      ...(imgId && { imgId }), // set value only if `imgId` is not falsy
      _id: req.params.id, // this is required, or a new ID will be assigned!
    });

    // if errors, render form again w/ sanitized values & error msgs
    if (!errors.isEmpty()) {
      // if user uploaded an image, delete it from Cloudinary
      if (req.file) cloudinary.deleteImg(imgId);

      // get all categories
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      res.render('item-create', {
        title: 'Create Item',
        categoryList: allCategories,
        item,
        errors: errors.array(),
      });
    } else {
      // if there's an old imgId and it doesn't match new one, delete old one on Cloudinary
      if (oldItem.imgId && imgId !== oldItem.imgId)
        cloudinary.deleteImg(oldItem.imgId);

      // update Item record and redirect to detail page
      await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(item.url);
    }
  }),
];
