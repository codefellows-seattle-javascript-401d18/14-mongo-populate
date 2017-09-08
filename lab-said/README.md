## Documentation  
* My app allow you to work with the MongoDB database management system which is a NoSQL database management system  
* My app allow you to create custom data models *(schemas)* through the use of mongoose.js and use mongoose.js helper methods for interacting with our database persistence layer  
## Any resources that helped me complete this assignment:  
* http://mongoosejs.com/docs/documents.html  
* https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/  

https://mlab.com  
### What this project does:  
   The goal of my app is to practice using express, Mongo and mongoose. We'll be using.  
   * We will be able to create a 2 resource MongoDB and Express API  
   * We will be able to reference additional resources as part of their mongoose.js based data models  
   * We will be able to use the `.populate` method to allow for resource query population  
#### Feature Tasks  
  * create an HTTP Server using `express`  
  * create a resource **model** of my choice that uses `mongoose.Schema` and `mongoose.model`  
  * use the `body-parser` express middleware to parse the `req` body on `POST` and `PUT` requests  
  * use the npm `debug` module to log the functions and methods that are being used in my application  
  * use the express `Router` to create a route for doing **RESTFUL CRUD** operations against your _model_  
## How could you get started' with my api on your own:  
      - How do you clone this project?
      First fork from my repository, then clone it into your folder, that will create a repository with the same name on your git hub, then create a branch.   
      - How do you start using this project?  
          1. You will need to have NodeJS installed on your machine.  
          2. You will need to install httpie for Mac users in one terminal window and use postman for Windows users or download curl.  
          3. Download mongodb.  
          4. Using the Windows command line point to the data model in your application and run the server using this command>"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath .\datat\db  
          5. Using a separate  Windows command line get mongoos runing by using the command >"C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe"  
          6. Then start up nodemon in a separate terminal window.  
## Mongo database steps:  
2. Have four windows open in terminal.  
3. First window- 'mongod --dbpath ./data/db'  
4. Second window- 'npm install mongodb' within the lab-maddy/data/db folder to start the mongo shell (to be able to see the database data)  
  - should see:  
    MongoDB shell version v3.4.7
    connecting to: mongodb://127.0.0.1:27017
    MongoDB server version: 3.4.7
    Welcome to the MongoDB shell.
    For interactive help, type "help".  
5. Third window- 'npm run start:watch' within the lab folder of the project(ie- lab-maddy) to get the server running and listening for changes  
6. Back in second window- 'mongo'  
7. In forth window within lab-maddy folder, use this one to ping your server and make http requestss-
'http POST :3000/api/toy name=gavin desc=human'  
* If the name and desc are not strings, mongo will throw a 400 error.  
should see:  
```
HTTP/1.1 201 Created  
Allow-Access-Control-Headers: *  
Allow-Access-Control-Origin: *  
Connection: keep-alive  
Content-Length: 150  
Content-Type: application/json; charset=utf-8  
Date: Thu, 07 Sep 2017 15:37:08 GMT  
ETag: W/"96-NeBQ0TqCqht21DpkTG/FZh+C+bs"  
X-Powered-By: Express  
{  
    "__v": 0,  
    "_id": "59b167a41f2258fbdb489cc1",  
    "createdAt": "2017-09-07T15:37:08.242Z",  
    "desc": "human",  
    "name": "gavin",  
    "updatedAt": "2017-09-07T15:37:08.242Z"  
}  
```
8. Back in the second window- 'show dbs'
  - should see:  
  admin    0.000GB  
  local    0.000GB  
  toy-dev  0.000GB  
9. Then type- 'use toy-dev'  
  - should see:  
  switched to db toy-dev  
10. Then type- 'show collections'  
  - should see:  
  toys //mine still says gooses....  
11. Then "db.toys."  
    - to make sure things are being posted-- db.toys.find()
    - db.toys.drop() will drop those collections   

# Packages and commands to remember:
  - In package.json's scripts, add- "start:debug": "DEBUG=http* nodemon server.js",
  - created an index.js and set it as the start point in package.json
  - added a cors.js file
  - npm install mongodb
  - npm install express - DONE
  - npm install (for node modules) -
  - npm install superagent -
  - npm install uuid -
  - npm install -D jest -
  - node server.js or just nodemon (depending on the day??)
    - rs (restart, if needed)
  - run start: watch -
  - npm run start:debug - then attempt a POST and this will tell you where you're wrong

  - npm run debugger -
  - npm install bluebird (sets this as a dependency in package.json) -
  - - Using dotenv:
    - What is it?
    This module loads environment variables from a .env file that you create and adds them to the process.env object that is made available to the application.
  - Don't forget to git ignore your `db/` dir

# Collaborators:  
  Madeline, Isaiah.
