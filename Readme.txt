Hello,
This project will explain how to properly use Node Express.js
by a form example.
Have a fun!

1) To install the project you just have to run "npm i"
2) To run the app "npm run start"
3) Install a db server (MySQL, PostgreSQL, MariaDB...) and replace the parameters
by your configuration in the following files:
- db.js
- message.js => adapt the query with your table and cols

Explanation of all the dependancies and command used: 
- npm init => Create a node project
- npm i --save express => Express is a framework used to build node app and handle routes
- npm i -g nodemon => Nodemon updates by itself the project whithout needing to restart the server
- npm i --save ejs => EJS is a template motor api ejs
- npm i --save body-parser => middleware request parser library
- npm i express session => Express session is used to create cookies 
- npm i moment => Moment is a date format library
- npm run start => launch the server