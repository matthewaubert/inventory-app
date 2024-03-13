const Category = require('../models/category');
const Item = require('../models/item');

const asyncHandler = require('express-async-handler');
const { formatPrice } = require('../utils/util');

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
  console.log(category);

  if (!category) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  res.render('category-detail', {
    title: category.name,
    category,
    categoryItems,
    formatPrice,
  });
});

// display Category create form on GET
exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category create GET');
});

// handle Category create on POST
exports.categoryCreatePost = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category create POST');
});

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
