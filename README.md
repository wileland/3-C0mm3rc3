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
"3 C0mm3rc3" is a comprehensive e-commerce backend solution tailored for internet retail companies. Utilizing Express.js for the server framework, Sequelize as the ORM, and MySQL for database management, this system streamlines product, category, tag, and user account operations, providing an all-encompassing backend ready to integrate with any frontend framework to compete in the digital marketplace.

User Story
AS A manager at an internet retail company
I WANT a backend for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies.

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
bash
Copy code
3-c0mm3rc3-root/
___ db/ schemal.sql
│
├── config/
│   └── connection.js
│
├── models/
│   ├── Category.js
│   ├── Product.js
│   ├── ProductTag.js
│   ├── Tag.js
│   └── User.js
│
├── routes/
│   └── api/
│       ├── categoryRoutes.js
│       ├── productRoutes.js
│       ├── tagRoutes.js
│       └── userRoutes.js
│
├── seeds/
│   ├── category-seeds.js
│   ├── product-seeds.js
│   ├── productTag-seeds.js
│   └── tag-seeds.js
│
├── tests/
│   └── (test files here)
│
├── .env (not tracked by git)
├── package.json
├── README.md
└── server.js
Installation
To set up this project locally for development purposes, follow these steps:

Clone the repository to your local machine using git clone https://github.com/your-username/3-c0mm3rc3.git.
Navigate to the cloned directory via the command line.
Install the required npm packages by running npm install.
Create a .env file in the root directory and fill it with your MySQL user credentials and database information like so:
arduino
Copy code
DB_NAME='ecommerce_db'
DB_USER='your_username'
DB_PW='your_password'
Execute the schema within the MySQL shell or use a database management tool to set up the database using the command source db/schema.sql.
Seed the database with test data by running npm run seed.
Usage
To start the server, run npm start in your command line. This will initiate the Express.js server and sync the Sequelize models to the MySQL database. The server will listen on localhost:3001 by default.

To interact with the API, you can use the following endpoints:

GET /api/categories - Retrieve all categories
POST /api/categories - Create a new category
PUT /api/categories/:id - Update a category by its id
DELETE /api/categories/:id - Delete a category by its id
... (and so on for products, tags, and users)
For the full list of endpoints and their functionalities, refer to the routes directory.

Testing
Automated tests for this application can be run using Jest. To execute these tests, run npm test in the command line. Make sure you are in the root directory of the project before running the tests.

For manual testing, use an API client like Insomnia Core or Postman. Import the provided JSON collection to test the various endpoints and their functionalities.

Deployment
This application is set up for deployment on Heroku with the JawsDB MySQL add-on for the database. For detailed instructions on how to deploy to Heroku, please refer to the Heroku official documentation.

Contributing
If you are interested in contributing to this project, please fork the repository, create a feature branch, and submit a pull request for review.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.