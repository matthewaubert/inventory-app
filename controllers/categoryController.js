const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

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
  res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
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
