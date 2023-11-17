# E-commerce Back End Starter Code

# E-commerce Backend

## Table of Contents
1. [User Story](#user-story)
2. [Acceptance Criteria](#acceptance-criteria)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## User Story

**AS A** manager at an internet retail company  
**I WANT** a back end for my e-commerce website that uses the latest technologies  
**SO THAT** my company can compete with other e-commerce companies

## Acceptance Criteria

**GIVEN** a functional Express.js API  
**WHEN** I add my database name, MySQL username, and MySQL password to an environment variable file  
**THEN** I am able to connect to a database using Sequelize  

**WHEN** I enter schema and seed commands  
**THEN** a development database is created and is seeded with test data  

**WHEN** I enter the command to invoke the application  
**THEN** my server is started and the Sequelize models are synced to the MySQL database  

**WHEN** I open API GET routes in Insomnia Core for categories, products, or tags  
**THEN** the data for each of these routes is displayed in a formatted JSON  

**WHEN** I test API POST, PUT, and DELETE routes in Insomnia Core  
**THEN** I am able to successfully create, update, and delete data in my database  

## Project Structure

Below is the project structure for the e-commerce backend:

ecommerce-backend/
├── config/
│ └── connection.js
├── controllers/
│ ├── categoryController.js
│ ├── productController.js
│ └── tagController.js
├── db/
│ └── schema.sql
├── models/
│ ├── Category.js
│ ├── Product.js
│ ├── Tag.js
│ └── ProductTag.js
├── routes/
│ ├── api/
│ │ ├── categoryRoutes.js
│ │ ├── productRoutes.js
│ │ └── tagRoutes.js
│ └── index.js
├── seeds/
│ ├── category-seeds.js
│ ├── product-seeds.js
│ ├── tag-seeds.js
│ └── productTag-seeds.js
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
├── .env
└── .gitignore


## Setup and Installation

(TBD: Instructions on setting up the environment and installation process)

## Usage

(TBD: Instructions on how to use the application)

## Contributing

(TBD: Guidelines for contributing to the project)

## License

(TBD: Project License)

