#! /usr/bin/env node

console.log(
  'This script populates some test items and categories to your database. Specify the database connection string as an argument - e.g. node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory_app?retryWrites=true&w=majority&appName=Cluster0"',
);

// get arguments passed on the command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Item = require('./models/item');
const exampleData = require('./models/example-data');

const categories = [];
const items = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// set `mongoDB` to passed-in connection string
const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected');
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// create a category for each object in exampleData.categories
async function createCategories() {
  console.log('Adding categories');
  await Promise.all(
    exampleData.categories.map((category, index) =>
      categoryCreate(index, category.name, category.description),
    ),
  );
}

// create an item for each object in exampleData.items
async function createItems() {
  console.log('Adding items');
  await Promise.all(
    exampleData.items.map((item, index) =>
      itemCreate(
        index,
        item.name,
        item.description,
        // find index of correct category, then use as category ref
        categories[findIndexByName(exampleData.categories, item.category)],
        item.price,
        item.quantity,
      ),
    ),
  );
}

// We pass the index to the `___Create` functions so that, for example,
// category[0] will always be the ___ genre, regardless of the order
// in which the elements of promise.all's argument complete
async function categoryCreate(index, name, description) {
  const category = new Category({ name, description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, quantity) {
  const item = new Item({ name, description, category, price, quantity });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

// find index of element with given `elName` in given `data`
function findIndexByName(data, elName) {
  return data.findIndex((el) => el.name === elName);
}
