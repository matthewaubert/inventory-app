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

1. [Create a new Express app]("https://gist.github.com/matthewaubert/c7b652d2c25be2b09cc9c82316d9652c")

1. Create a new MongoDB collection using the web user interface

1. Set up my database schemas and models

1. [Download the MDN `populatedb.js` file]("https://raw.githubusercontent.com/hamishwillee/express-locallibrary-tutorial/master/populatedb.js") and edit it, or re-write it using the specifics of my models. Then run it to populate my database.

1. Set up the routes and controllers

1. Create all of the 'READ' views (i.e. category view, item view)

1. Create all of the forms and build out the controllers for the create, update, and delete actions

1. Figure out how to to add and upload images for each item
   - Review the [`multer` middleware documentation]("https://github.com/expressjs/multer")
   - Review the [Cloudinary documentation]("https://cloudinary.com/documentation/node_integration")

1. Style app and make it responsive

1. Deploy app

## 3/11/24

Today I need to:
- [x] Create a new MongoDB collection
- [x] Set up my database schemas and models
- [x] Brainstorm example Categories and Items:
  - Camp and Hike: Explore the great outdoors with our camping and hiking essentials. From sturdy tents to lightweight cookware, find everything you need for a memorable adventure.
    - Six Moons Designs Skyscape Trekker Backpacking Tent
      - description: The Skyscape Trekker is our most versatile solo tent. With a floor over 8 feet long, you’ll have plenty of room to stretch out – no matter your height. Its convenient two-door setup provides lots of external storage under the vestibules. Both vestibules can be configured in different ways or rolled back to open up the tent to over 300-degree views.
      - price: 275
      - qty: 5
    - Gossamer Gear 60 Backpack
      - description: This award-winning pack’s roomy main pocket holds your shelter, clothing, sleeping pad and food. There are seven extra pockets - one mesh for wet stuff, two easy-to-reach for water and high-energy snacks, and the rest for whatever else.  Made of custom 100 and 200 denier Robic nylon fabric, this tough, light pack delivers a very comfortable carry even when overloaded with 35 pounds of gear.
      - price: 285
      - qty: 5
    - Enlightened Equipment Enigma Sleeping Quilt 850FP
      - description: The Enigma Sleeping Quilt is our lightest and most minimalist sleeping quilt. Pairing the beloved quilt template of our Revelation Sleeping Quilt with a completely sewn-closed footbox, the Enigma is the perfect ultralight quilt for those who always get cold feet. Exceptionally warm and extraordinarily light, the Enigma offers upper body freedom of movement, while providing structure for your feet.
      - price: 355
      - qty: 8
    - Therm-a-Rest NeoAir XLite NXT Sleeping Pad
      - description: With improved warmth and comfort, the NeoAir XLite NXT solidifies the legacy of its predecessor as the finest ultralight air sleeping pad for year-round backcountry adventures. At 3-inches thick, with a horizontal baffled structure, the XLite NXT delivers maximum comfort and support at a minimal weight and packed size.
      - price: 209.95
      - qty: 12
    - Toaks Titanium 750ml Pot
      - description: The 750ml titanium pot is everything you need, nothing more. Featuring foldable handles and a lid with lockable grips, 750's are easy to handle. Its gradations, in both ml and oz, help you ration your supplies. The titanium material makes it extremely resistant to corrosion and any physical strain. Weighs only 3.0 oz (86 g).
      - price: 26
      - qty: 26
    - MSR PocketRocket 2 Stove
      - description: The next-generation PocketRocket® 2 stove takes everything impressive about the iconic original and puts it into an even smaller and lighter high-performance design. Barely noticeable in your pack, it’s fast at camp, boiling 1 liter of water in 3.5 minutes. Precision flame control goes from torch to simmer, while our WindClip® windshield boosts efficiency in breezy conditions.
      - price: 49.95
      - qty: 18
  - Climb: Elevate your outdoor experience with our climbing gear. Whether you're a seasoned mountaineer or a beginner climber, discover quality equipment including harnesses, ropes, and safety gear.
    - La Sportiva Tarantulace Climbing Shoes
      - description: With the Tarantulace, the best-selling climbing shoe in the US, you can climb harder and longer while suffering less. Thanks to its unlined leather upper, asymmetric shape and roomier toe box. The aggressive rubber heel rand and the FriXion® RS rubber is sticky, yet hard wearing, offering increased durability and providing a powerful edging platform.
      - price: 89
      - qty: 23
    - Black Diamond Momentum Harness
      - description: For all-around climbers who know that time spent fiddling with leg loops and adjusting a pinching waistbelt is time wasted, the Black Diamond Momentum delivers a time-saving design for all styles of climbing. A pre-threaded Speed Adjust waistbelt buckle saves time and eliminates error when tying in, while Dual Core Construction™ puts an emphasis on comfort, even when you're posted up at a hanging belay.
      - price: 64.95
      - qty: 31
    - Mammut Crag We Care Classic Rope 9.5 mm x 60 m
      - description: With the 9.5 Crag We Care Classic Rope for sports and classic climbing, Mammut aims at reducing the environmental footprint of its rope production. The sheath of the single rope is made from residual yarn left over from changes between different colors. Previously disposed of, this yarn is a high-quality, brand-new raw material. All 9.5 Crag We Care Classic single ropes therefore fully comply with Mammut's high quality standards.
      - price: 164.95
      - qty: 16
    - Petzl Reverso Belay Device
      - description: Known for being versatile and lightweight, REVERSO is a belay device for single or multi-pitch climbing and mountaineering. It allows you to belay your climbing partner, rappel, and use Reverso mode to belay one or two seconds. The specific design allows the rope to glide smoothly through the device and reduces wear. It is compatible with most rope diameters: single 8.5 to 10.5 mm, half 7.1 to 9.2 mm, and twin 6.9 to 9.2 mm.
      - price: 39.95
      - qty: 34
  - Cycle: Pedal into adventure with our cycling collection. Explore a range of bikes, accessories, and apparel for cyclists of all levels. Gear up for thrilling rides and scenic routes.
    - Cannondale Habit LT 2 Mountain Bike
      - description: Down for the ups but living to get down, the Cannondale Habit LT 2 is a progressive trail mountain bike with an alloy frame and a slightly slacker geometry for ripping down hills.
      - price: 3625
      - qty: 3
    - Smith Convoy MIPS Bike Helmet
      - description: When designing the Smith Convoy, we set out to create a mountain bike helmet that felt like it was tailor-made for your head. An adjustable dial on the back lets you fine-tune the fit for comfort. When it comes to comfort and protection, the helmet ticks all the boxes. It has a Mips® liner system and all the ventilation you'll need through the hottest days on the trail.
      - price: 85
      - qty: 24
    - Ortlieb Back-Roller Panniers - Pair
      - description: Durable polyester fabric make this pannier a long lasting touring companion. The waterproof roll closure ensures safe and waterproof storage of food and equipment. With its QL2.1 fixing it is quickly mounted and taken off the bike rack. A shoulder strap provides carrying comfort when taken off the rack.
      - price: 200
      - qty: 13
    - Bontrager Commuter Comp Bike Saddle
      - description: The Commuter Comp saddle offers the comfort of a full cut-out saddle with the support of a saddle designed specifically for commuters and fitness riders. A durable, weather-resistant cover material protects the dual density shell and air foam construction of the saddle for long-lasting comfort wherever you ride. Plus, a simple integrated Blendr mount makes it easy to add a Bontrager Flare rear light.
      - price: 52
      - qty: 19
  - Snow: Embrace winter with our snow collection. From snowboarding to skiing, find top-notch gear like insulated jackets, snowboards, and accessories designed to keep you warm and stylish on the slopes.
    - Nordica Enforcer 94 Unlimited Skis - 2023/2034
      - description: The 2023 Nordica Enforcer 94 Unlimited sits in the middle of the widths of the Unlimited series, offering a highly versatile and useful ski for both backcountry enthusiasts and all-mountain skiers looking for a lighter, less-demanding mid-90's ski. This does a little of both/everything, allowing skiers to rely and stand on an established shape and profile, but in a different build.
      - price: 799.95
      - qty: 3
    - MSR Lightning Ascent Snowshoes
      - description: Lightning Ascent snowshoes represent the pinnacle of ultralight and aggressive all-terrain performance, and now feature our advanced Paragon™ binding. Designed to wrap securely around your boot without pressure points, the binding’s mesh strap ensures maximum foot control with truly uncompromised comfort.
      - price: 389.95
      - qty: 7
    - Black Diamond Recon X Avy Safety Set
      - description: A complete collection of avalanche safety essentials for the everyday backcountry traveler, the Black Diamond Recon X Avy Safety Set features durable, lightweight and easy-to-use tools that are ideal for anytime you venture into backcountry terrain.
      - price: 449.95
      - qty: 4
    - Hillsound Trail Crampon Ultra
      - description: Are you into trail running, hiking or fastpacking and looking for a lightweight, reliable and comfortable option when moving across as well as up and down mountains? Then the Trail Crampon Ultras are your choice. They are used by athletes as well as outdoor enthusiasts and give you the confidence to focus on your performance and experience.
      - price: 89.95
      - qty: 17
    - Rossignol Soulside Snowboard with Soulside Bindings - 2023/2024
      - description: Versatile and forgiving, the Rossignol Soulside snowboard is an all-mountain ride for building skills and expanding your range. The right combination of rocker and soft flex makes for a maneuverable, catch-free ride that lets you push into new terrain and explore the mountain in any snow conditions.
      - price: 599.95
      - qty: 2
  - Water: Dive into aquatic adventures with our water gear. Discover a variety of equipment for kayaking, fishing, and water sports. Stay afloat with quality life jackets, paddles, and more.
    - Aquaglide Deschutes 110 Inflatable Kayak
      - description: With its combination of length, stiffness, and light weight, the Deschutes 110 is designed for effortless paddling, portability, and ease of transport. The hull design features a low rocker profile for increased surface area on the water combined with sleek, narrow tubes for better tracking, glide, and speed. The Deschutes 110 is built for the adventurer looking for a lightweight, efficient open deck touring boat that’s an excellent choice for single or multi-day expeditions.
      - price: 549.95
      - qty: 7
    - Astral E-Ronny PFD
      - description: Designed for maximum comfort and usability, the E-Ronny offers a highly functional pocket layout and incorporates industry first technologies Thin-Vent™ Back design and bluesign® certified 100% recycled polyester shell.
      - price: 135
      - qty: 23
    - Oakley Holbrook Sunglasses
      - description: Matching modern technology with a timeless design inspired by the screen heroes from the 1940s, 50s and 60s, the Oakley Holbrook sunglasses epitomize the spirit of exploration and adventure.
      - price: 217
      - qty: 15
- [x] Write a `populatedb.js` script and run it to populate my database

## 3/12/24

Today I need to:
- [x] Set up routes and controllers
  - [x] `inventory/` - home/index page
  - [x] `inventory/<objects>` - list of all items or categories
  - [x] `inventory/<object>/<id>` - detail page for a specific item or category
  - [x] `inventory/<object>/create` - form to create a new item or category
  - [x] `inventory/<object>/<id>/update` - form to update a specific item or category
  - [x] `inventory/<object>/<id>/delete` - form to delete a specific item or category
- [x] Research and install Tailwind CSS
- [x] Create base template (header and footer)

## 3/13/24

Today I need to:
- [x] Create all views and build out controllers for 'Read' action
  - [x] index view
  - [x] item list view
  - [x] category list view
  - [x] item detail view
  - [x] category detail view
- [x] Create all forms/views and build out controllers for 'Create' action
  - [x] create item GET
  - [x] create item POST
  - [x] create category GET
  - [x] create category POST

# 3/14/24

Today I need to:
- [x] Create all forms/views and build out controllers for 'Delete' action
  - [x] delete item GET
  - [x] delete item POST
  - [x] delete category GET
  - [x] delete category POST
- [x] Create all forms/views and build out controllers for 'Update' action
  - [x] update item GET
  - [x] update item POST
  - [x] update category GET
  - [x] update category POST
- [x] Figure out how to to add and upload images for each item
  - [x] Review the [`multer` middleware documentation]("https://github.com/expressjs/multer")
  - [x] Review the [Cloudinary documentation]("https://cloudinary.com/documentation/node_integration")
  - [x] Add image-uploading functionality to item create & update using Multer

# 3/16/24
Today I need to:
  - [x] Hook up to Cloudinary

# 3/17/24
Today I need to:
  - [x] Style app
  - [x] Add favicon
  - [x] Find images for all items

# 3/18/24
Today I need to:
  - [x] Update `populatedb.js` script to: upload images to Cloudinary and add url to database
  - [x] Create production database
  - [x] Last code changes / clean up code
  - [x] Deploy app
