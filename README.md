3 C0mm3rc3: E-Commerce Backend Project
Table of Contents
Introduction
User Story
Acceptance Criteria
Project Structure
Installation
Usage
Testing
Deployment
Contributing
License
Introduction
"3 C0mm3rc3" is an e-commerce backend application built using Express.js, Sequelize ORM, and MySQL. It is designed to manage and handle operations for products, categories, tags, and user accounts, providing a robust backend system for e-commerce platforms.

User Story
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

Acceptance Criteria
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database

Project Structure
The "3 C0mm3rc3" project structure is as follows:
(3-c0mm3rc3-root)
│   server.js
│   package.json
│   .env (not tracked by git)
│   README.md
└───config
│   │   connection.js
└───models
│   │   Product.js
│   │   Category.js
│   │   Tag.js
│   │   ProductTag.js
│   │   User.js
└───routes
│   └───api
│       │   productRoutes.js
│       │   categoryRoutes.js
│       │   tagRoutes.js
│       │   userRoutes.js
└───seeds
│   │   product-seeds.js
│   │   category-seeds.js
│   │   tag-seeds.js
│   │   productTag-seeds.js
└───tests
    │   (test files here)
    

Installation
(Provide detailed instructions on how to install and set up your project, including cloning the repository and installing dependencies.)

Usage
(Explain how to use the application, including starting the server and accessing different API endpoints.)

Testing
(Details on how to run automated tests using Jest or manual testing via Insomnia.)

Deployment
(Instructions or notes about deploying the application on platforms like Heroku.)

Contributing
(Guidelines for those who wish to contribute to the project.)

License
(Information about the project's license.)
