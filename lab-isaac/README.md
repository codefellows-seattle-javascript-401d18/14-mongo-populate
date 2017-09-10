# Lab 14: MongoDB Dual Resource and populate

## About

This lab assignment is a Nodejs backend API app.  It takes http POST, GET, PUT, and DELETE calls.  The database is MongoDB for the toys and children being tracked.  The two main urls are ```api/toys``` and ```api/child```.  Jest is used for testing and a test sweet is dedicated to each toy and child POST, GET, PUT, and DELETE calls.

## Installation

To install this app, you need to have Nodejs installed on your system.  MongoDB needs to also be installed and running on you system.  Clone this repo and navigate to ```14-mongo-populate/lab-isaac``` and then ```npm install``` will install all necessary packages via npm. You must create a .env file in the lab-isaac folder setting the following variables:
```
MONGODB_URI= 'mongodb://localhost/*yourDBname*'
PORT = **SPECIFY A PORT**
```

## Run Application

To run this application you have the following 3 options:  ```npm run start```, ```npm run start:watch```, or ```npm run start:debug```.
