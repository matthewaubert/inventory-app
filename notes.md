# Inventory Application Notes

Notes and progress for my Inventory Application

## Assignment
> Ref: https://www.theodinproject.com/lessons/nodejs-inventory-application

Alright! Let’s flex our skills a little! [That tutorial]("https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website") was humongous, and you learned a lot of things. The only way to make it stick is to practice! For this project you are going to create an inventory management app for an imaginary store. It’s up to you what kind of business this is – you could be selling groceries, car parts, baby-toys, musical-instruments, ponies or anything!

Your Inventory app should have categories and items, so when the user goes to the home-page they can choose a category to view, and then get a list of every item in that category. You should include all of the CRUD methods for both items and categories, so anybody that’s visiting the site can Create, Read, Update or Delete any Item or Category.

1. Before you begin, take a moment to write down all of the models you’ll need and the fields that should go in them. It might help to grab a pencil and some paper and literally draw a diagram like you saw in the [MDN tutorial on databases]("https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Designing_the_LocalLibrary_models").
   - Items should at least have: a name, description, category, price, number-in-stock and URL, though you should feel free to add more fields if it seems relevant to the type of business you’ve chosen.
   - Categories should at least have a name, a description and a URL.

1. We’re going to follow the basic path that was demonstrated by the MDN tutorial to set up and flesh out your app, so first choose a templating language and generate the boilerplate skeleton with express-generator.

1. Create a new Mongo Collection using the web-interface as demonstrated in the tutorial and then set up your database schemas and models.

1. In the Library tutorial you populated your database with some sample data that was provided in a `populatedb.js` file. Actually understanding how that worked was over your head at the time, but now that you’ve finished that tutorial you’ll be able to understand how it works. [Download the `populated.js` file]("https://raw.githubusercontent.com/hamishwillee/express-locallibrary-tutorial/master/populatedb.js") and edit it, or re-write it using the specifics of your models and then run it to populate your database!

1. Set up the routes and controllers you’re going to need.

1. Create all of the ‘READ’ views (i.e. view category, and view item)

1. Create all the forms and build out the controllers you need for the rest of the CRUD actions.

1. Deploy it and show off what you’ve done!

### Extra Credit
1. Try to figure out how to add and upload images for each item. Use the [`multer` middleware](https://github.com/expressjs/multer) which was created by the Express team. The documentation in the README there should be enough to get you going.
   - While you can store the image buffer data as binary directly in MongoDB, this can be quite a performance hit the more images you have to handle and the larger they are. You may wish to look into using a service such as [Cloudinary](https://cloudinary.com/documentation/node_integration) where you can upload images to, then store the images’ URLs in MongDB instead.

1. We will learn about creating users with secure passwords in a later lesson, but for now we don’t want just anyone to be able to delete and edit items in our inventory! Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action.

## 3/10/24
### Plan

1. Decide on a kind of business for my app: Outdoor equipment store

1. Brainstorm what models I'll need and the fields that should go with them:
   - Categories
     - Name
     - Description
     - URL
     - Image URL?
   - Items
     - Name
     - Description
     - Category (1)
     - Price
     - Stock qty
     - URL
     - Image URL?

1. Decide on a templating language: EJS

1. [Create a new Express app]("https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website")

1. Create a new MongoDB collection using the web user interface

1. Set up my database schemas and models

1. [Download the MDN `populatedb.js` file]("https://raw.githubusercontent.com/hamishwillee/express-locallibrary-tutorial/master/populatedb.js") and edit it, or re-write it using the specifics of my models. Then run it to populate my database.

1. Set up the routes and controllers

1. Create all of the 'READ' views (i.e. category view, item view)

1. Create all of the forms and build out the controllers for the create, update, and delete actions

1. Figure out how to to add and upload images for each item
   - Review the [`multer` middleware documentation]("https://github.com/expressjs/multer")
   - Review the [Cloudinary documentation]("https://cloudinary.com/documentation/node_integration")

1. Deploy the app

## 3/11/24

Today I need to:
- [x] Create a new MongoDB collection
- [x] Set up my database schemas and models
- [ ] Write a `populatedb.js` script and run it to populate my database
- [ ] Set up routes and controllers
