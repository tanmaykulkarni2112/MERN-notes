const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const notesRoute = require('./routes/notesRoute.js');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
const auth_password = process.env.PASSWORD;
const connectDB = require('./config/db.js');
const rateLimiter = require('./middleware/rateLimiter.js');

if(process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin:'http://localhost:5173',
  }));
}

app.use(express.json());
app.use(rateLimiter);

// Prefix handling, so that all routes with /api/notes will be handled by notesRoute.js
app.use('/api/notes', notesRoute);

// for handling the deletion
app.post('/api/delete', (req,res) => {
  const {password} = req.body;
  if(password == auth_password) {
    return res.status(200).json({
      msg : "Authorized"
    });
  }
  return res.status(401).json({
    msg : "Unauthorized"
  });
})

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")))
  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"));
  });
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
  });
});
