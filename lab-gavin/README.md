# *SeveringUpSomeMongXpresso*
# Servering the best MongXpress Experience around.

# Server request and response demonstration using Express, node.js, and MongoDB.
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

## Project Description
Using node.js, HTTP, superagent, Express, MongoDB, and Mongoose I have created a Server that responds to different GET, POST, PUT, and DELETE responses from a developer position. The requests can interact with a local Database managed with MongoDB. This project represents what is possible with a few simple tools. We can create a Database from POST requests with the information provided by the dev. Then we can interact with the database with GET, PUT, and DELETE.

## Table of Contents
+ [Installation](#installation)
+ [Usage](#Usage)
+ [About](#About)

### Installation:
+ Fork this repository and clone the forked repository anywhere you'd like on your computer.

+ Open your terminal
  + Navigate to the folder where you did your git clone with your newly forked repository.
  + Make sure you are in the root directory IE. lab-gavin.;
  + Type `npm i` into your terminal.
+ Open *Four* terminal windows.
+ In the first terminal type
  + `npm run start:watch`

  + This creates a local server which should log to the console
    + `server up:: 3000`

+ In the second terminal window type
  + `brew install httpie`

  + This installs httpie which is a package that allows you to make calls to our local server.

+ In the third terminal window type
    + `mongod --dbpath ./data/db`

+ In the Fourth terminal window type
  + `mongo` then

+ Now from the the second terminal window you can make a series of GET, POST, PUT, and DELETE requests.

  ## These are the only variations of this API and endpoints possible.

  ### POST requests
  + Example ==>`http POST localhost:3000/api/toy name=name desc=desc`
  + Example w/ Mock info ==> `http POST localhost:3000/api/toy name=PowerRanger desc='Super Awesome Red Ranger'`

  ### GET requests
  + Example.==>`http GET localhost:3000/api/toy/idNumber`
  + Example w/ Mock ID ==> `http GET localhost:3000/api/toy/ee30e86a-36ee-4843-b47e-a252531bac41`

  + *Alternatively to get all documents in collection*

  + `http GET localhost:3000/api/toy`


  ### PUT requests
  + Example ==>`http PUT localhost:3000/api/toy/someid name=new name desc=new desc'`
  + Example w/ Mock ID ==> `http PUT localhost:3000/api/toy/96d6514b-b1da-4a11-a8a7-b044436a23ab name=PowerRangerGreen desc='Totally awesome Green Ranger'`

  ### DELETE requests
  + Example`http DELETE localhost:3000/api/toy/some Id` will return 404.
  + Example w/ Mock ID ==> `http DELETE localhost:3000/api/toy/ee30e86a-36ee-4843-b47e-a252531bac41`.

  ### Examples of bad endpoints
  `http GET localhost:3000/api/toy/PowerRanger`

  `http GET localhost:3000/toy/api/PowerRanger`

  `http GET localhost:3000/api/toy/`

+ If you want to interact with your database through mongo and mongoose...
  + In your fourth terminal window you can use the following commands.

  + `show collections`
    + This shows all your collections that are in the database

  + `use toy-dev`
    + This will switch to the collection you want, allowing you to manipulate the data inside. In this example I used toy-dev which will also be the name of the collection for you, if installed correctly.

  + `db.toys.find()`
    + This will return all the documents or items in the database under the collection you used.

  + `db.toys.drop()`
    + This will delete all the documents or items in the database under the collections you used.

### Usage
This app is completely free to be used however you'd like!


### About
I am currently a Full Stack Web Developer with focus in UX. If you are interested in using me for any of your projects please feel free to reach out to me!
