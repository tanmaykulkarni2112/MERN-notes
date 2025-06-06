const Note = require('../model/Note.js');


const getAllNotes = async(_ ,res) => {
    try {
        const notes = await Note.find().sort({createdAt : -1}); // Sorted so that the latest note is shown first
        res.status(200).json(notes);
    }catch(err) {
        console.error(err);
        res.status(500).json({message : "Server Error"});
    }
};

const getNote = async(req,res) => {
    try {
        const notes = await Note.findById(req.params.id);
        res.status(200).json(notes);
    }catch(err) {
        console.error(err);
        res.status(500).json({message : "Server Error"});
    }
};

const postNotes = async (req,res) => {
    try{
        const body = req.body;
        if (!body.title || !body.content) {
            return res.status(400).json({message : "Title and content are required"});
        }
        const newNote = new Note({
            title : body.title,
            content : body.content
        })
        const savedNoted = await newNote.save();
        res.status(201).json({msg : "success"});
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message : "Error in postNotes controller"});
    }
};

const updateNote = async (req,res) => {
    try {
        const {title, content} = req.body;
        // TODO - why was the backend breaking when I tried to save it in noteId?
        // const noteId = req.params.id;
        const updated = await Note.findByIdAndUpdate(req.params.id , {title, content},{
            new : true
        });
        if (!updated) {
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json({
            message : "Note updated successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message : "Error in updateNotes controller"}); 
    }    
};



const deleteNote = async (req,res) => {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            return res.status(404).json({message : "Note not found"});
        }
        res.status(200).json({deletedNote});
    } catch (err) {
        console.error(err);
        res.status(500).json({message : "Error in deleteNotes controller"});
    }
};



module.exports ={ 
    getAllNotes,
    getNote,
    postNotes,
    updateNote,
    deleteNote
}