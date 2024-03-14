const Category = require('../models/category');
const Item = require('../models/item');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { encode } = require('he');

// display list of all Categories
exports.categoryList = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, 'name')
    .sort({ name: 1 })
    .exec();

  res.render('category-list', {
    title: 'All Categories',
    categoryList: allCategories,
  });
});

// display detail page for a specific Category
exports.categoryDetail = asyncHandler(async (req, res, next) => {
  const [category, categoryItems] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }, 'name price quantity').exec(),
  ]);

  if (!category) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category-detail', {
    title: category.name,
    category,
    categoryItems,
  });
});

// display Category create form on GET
exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
  res.render('category-create', { title: 'Create Category' });
});

// handle Category create on POST
exports.categoryCreatePost = [
  // validate and sanitize fields
  body('name', 'Name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .customSanitizer((value) => encode(value)),

  // process request after validation and sanitization
  asyncHandler(async (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    // create a Category object w/ escaped and trimmed data
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });

    // if errors, render form again w/ sanitized values & error msgs
    if (!errors.isEmpty()) {
      res.render('category-create', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
    } else {
      // data from form is valid. Save Category and redirect to Category page.
      await category.save();
      res.redirect(category.url);
    }
  }),
];

// display Category delete form on GET
exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete GET');
});

// handle Category delete on POST
exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete POST');
});

// display Category update form on GET
exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update GET');
});

// handle Category update on POST
exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update POST');
});
