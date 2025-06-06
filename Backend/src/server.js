const dotenv = require('dotenv');
dotenv.config();
// The below import is for the notesRoute.js file
// The object notesRoute can be named anything, but it is conventional to use the same name as the file
const notesRoute = require('./routes/notesRoute.js');
const express = require('express');
const app = express();
const port = process.env.PORT;
const connectDB = require('./config/db.js');


connectDB();


//  We are handling the routes in notesRoute.js
// app.use(express.Router()); // Commenting this out since we are not using it for now

// Prefix handling, so that all routes with /api/notes will be handled by notesRoute.js
app.use(express.json());
app.use('/api/notes', notesRoute);

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});