const express = require('express');
const router = express.Router();

// require controller modules
const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');

/* ITEM ROUTES */

// GET inventory home page
router.get('/', itemController.index);

// GET request for creating an Item (NOTE this must come before routes that display Item (uses id))
router.get('/item/create', itemController.itemCreateGet);

// POST request for creating an Item
router.post('/item/create', itemController.itemCreatePost);

// GET request to delete an Item
router.get('/item/:id/delete', itemController.itemDeleteGet);

// POST request to delete an Item
router.post('/item/:id/delete', itemController.itemDeletePost);

// GET request to update an Item
router.get('/item/:id/update', itemController.itemUpdateGet);

// POST request to update an Item
router.post('/item/:id/update', itemController.itemUpdatePost);

// GET request for one Item
router.get('/item/:id', itemController.itemDetail);

// GET request for list of all Items
router.get('/items', itemController.itemList);

/* CATEGORY ROUTES */

// GET request for creating a Category (NOTE this must come before routes that display Item (uses id))
router.get('/category/create', categoryController.categoryCreateGet);

// POST request for creating a Category
router.post('/category/create', categoryController.categoryCreatePost);

// GET request to delete a Category
router.get('/category/:id/delete', categoryController.categoryDeleteGet);

// POST request to delete a Category
router.post('/category/:id/delete', categoryController.categoryDeletePost);

// GET request to update a Category
router.get('/category/:id/update', categoryController.categoryUpdateGet);

// POST request to update a Category
router.post('/category/:id/update', categoryController.categoryUpdatePost);

// GET request for one Category
router.get('/category/:id', categoryController.categoryDetail);

// GET request for list of all Category
router.get('/categories', categoryController.categoryList);

module.exports = router;
