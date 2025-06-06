const express = require("express");
const router = express.Router();
const {postNotes, getNote ,updateNote, deleteNote, getAllNotes } = require("../controllers/notesController");

router.get("/", getAllNotes);

router.get("/:id", getNote); // For specific note fetching

router.post('/', postNotes);        

router.put('/:id',updateNote) 

router.delete('/:id', deleteNote);    

// We have to export router so it can be used in server.js
module.exports= router;

