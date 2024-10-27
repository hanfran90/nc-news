# Northcoders News API
Hello and Welcome to NC News API.
To successfully run this project locally please follow the instructions below.


## Project Summary
NC News is a RESTful API built using Express.js, where you will be able to interact with PostgreSQL database. The database includes articles, topics, user accounts and comments. Users can request articles, add comments and interact with the articles. The API has been tested and adheres to RESTful practices.

Link to the hosted version: https://nc-news-m2v4.onrender.com/api/


## Instructions
Please read through the instructions and perform them in order to set up and use the API.

### Development Environment
Minimum requirements for the development environment include:
- Node.js version 22.8.0
- PostgreSQL version 17

### Clone Repository
1. Fork and clone this repository to your local machine.

    ``` git clone <repository-url> ```

2. Navigate to and open the cloned project directory.

    ``` cd <project-directory> ```


### Install Dependencies

1. Now the project is open, install the project dependencies by running:

    ```npm install```

### Enironment Variable Setup

1. You will need to create two ```.env``` files in the root directory.

2. The first new file should be to run the test database: 
    - Create file and name: ```.env.test```
    - Add line to file: ``` PGDATABASE=<database_name_test>```

3. The second new file should be to run the development database: 
    - Create file and name:
    ``` .env.development```
    - Add line to file: ```PGDATABASE=<database_name_development>```


4. Please replace ```database_name_test``` and ```database_name_development``` with the names of your PostgreSQL database.

5. When both files are complete please add them to the .gitignore.

### Database Setup
1. To seed your local database, please run: ```npm run seed```

2. To run the test suite, please run command: ```npm test```


You should be able to successfully run the project and tests.

--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)