# 3 C0mm3rc3: E-Commerce Backend Project
(Prior work on separate repo:https://github.com/wileland/Empl0yee-Tr4cker)

## Table of Contents
- [Introduction](#introduction)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction
"3 C0mm3rc3" is an advanced backend system for e-commerce platforms, designed for seamless management of products, categories, tags, and user accounts. It utilizes Express.js for server-side operations, Sequelize ORM for database interactions, and MySQL as the data store, making it an ideal candidate for businesses looking to leverage the latest technology in the competitive online retail space.

## User Story
AS A manager at an internet retail company
I WANT a backend for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies.

## Acceptance Criteria
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

## Project Structure
3-c0mm3rc3-root/
│
├── config/
│ └── connection.js
│
├── db/
│ └── schema.sql
│
├── models/
│ ├── Category.js
│ ├── index.js
│ ├── Product.js
│ ├── ProductTag.js
│ ├── Tag.js
│ └── User.js
│
├── node_modules/
│
├── routes/
│ ├── api/
│ │ ├── category-routes.js
│ │ ├── product-routes.js
│ │ ├── tag-routes.js
│ │ └── index.js
│ ├── index.js
│ └── userRoutes.js
│
├── seeds/
│ ├── category-seeds.js
│ ├── product-seeds.js
│ ├── product-tag-seeds.js
│ ├── tag-seeds.js
│ └── index.js
│
├── tests/
│ └── (test files here)
│
├── .env (not tracked by git)
├── .env.test
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

## Installation
To set up this project locally for development purposes, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/your-username/3-c0mm3rc3.git`.
2. Navigate to the cloned directory via the command line.
3. Install the required npm packages by running `npm install`.
4. Create a `.env` file in the root directory and fill it with your MySQL user credentials and database information as shown:

DB_NAME='ecommerce_db'
DB_USER='your_username'
DB_PW='your_password'
JWT_SECRET_KEY='your_jwt_secret_key'

5. Execute the schema within the MySQL shell or use a database management tool to set up the database using the command `source db/schema.sql`.
6. Seed the database with test data by running `npm run seed`.

## Usage
To start the server, run `npm start` in your command line. This will initiate the Express.js server and sync the Sequelize models to the MySQL database. The server will listen on `localhost:3001` by default.

## Testing
Automated tests for this application can be run using Jest. To execute these tests, run `npm test` in the command line. Ensure you are in the root directory of the project before running the tests.

## Deployment
This application is set up for deployment on Heroku with the JawsDB MySQL add-on for the database. For detailed instructions on how to deploy to Heroku, please refer to the [Heroku official documentation](https://devcenter.heroku.com/articles/git).

## Contributing
Contributions to this project are welcome. Please fork the repository, create a feature branch, and submit a pull request for review.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
