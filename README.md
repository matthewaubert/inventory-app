# Inventory Application

A dashboard for managing the inventory of a fake outdoor store – create, view, update, and delete items and categories.

**[Click here to view the live site](https://inventory-app-ma.glitch.me)**

[![screenshot of home page](docs/images/home-page.png)](https://inventory-app-ma.glitch.me 'home page')
[![screenshot of item create page](docs/images/item-create-page.png)](https://inventory-app-ma.glitch.me/inventory/item/create 'item create page')
[![screenshot of item detail page](docs/images/item-detail-page.png)](https://inventory-app-ma.glitch.me/inventory/item/65f87123ea22c223be6a4bc7 'item detail page')

## How to Use

1. [Head to the live site](https://inventory-app-ma.glitch.me) on any device (mobile, tablet or desktop – it doesn't matter)
1. Browse around the site and perform the following operations:
   - Add new items to the inventory
   - **Create** new categories to organize inventory items
   - **Read**/view details about items and categories in the inventory
   - **Update** details about items and categories in the inventory
   - **Delete** items and categories from the inventory
1. All the product data is stored in a database, so your changes will persist!

https://github.com/matthewaubert/inventory-app/assets/132402803/63cd84de-f883-4f11-8080-6a3fa470f739

## Project Objectives

This project was built in order to practice the following skills:

- Create a web app in Node.js using the Express framework
- Use a MongoDB database to store my application's data
- Implement the [**Model-View-Controller (MVC)**](https://developer.mozilla.org/en-US/docs/Glossary/MVC) software design pattern
  - Build models to define what data structures my app should contain
  - Set up routes for requesting different information and templates (i.e. views) to render the data as HTML to be displayed in the browser
  - Build controllers for updating models and/or views in response to input from users of my app
- Perform **Create-Read-Update-Delete (CRUD)** operations in my app
- Build views and work with forms in Express using the EJS templating engine
- Deploy my application to production

## Technologies Used

### Languages
- JavaScript
- EJS – Embedded JavaScript templating engine
- CSS

### Frameworks and Tools
- Express
- MongoDB, Mongoose
- Tailwind CSS
- Git (obviously)
- He – for encoding and decoding HTML entities
- Dotenv – for keeping my database connection strings and API keys secret
- Multer – Express middleware for handling user-uploaded images
- Cloudinary – for hosting images

## Credits

- None of the item images are my own. They were obtained from the websites of their respective brands solely for the educational purpose of building this project.
- SVG icons from [Pictogrammers](https://pictogrammers.com/library/mdi/)
