const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
// The object notesRoute can be named anything, but it is conventional to use the same name as the file
const notesRoute = require('./routes/notesRoute.js');
const express = require('express');
const app = express();
const port = process.env.PORT;
const connectDB = require('./config/db.js');
const rateLimiter = require('./middleware/rateLimiter.js');

app.use(cors({
  origin:'http://localhost:5173',
}));
app.use(express.json());
app.use(rateLimiter);
// Prefix handling, so that all routes with /api/notes will be handled by notesRoute.js
app.use('/api/notes', notesRoute);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
  });
});

