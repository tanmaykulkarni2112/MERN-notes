const getAllNotes = (req,res) => {
    res.status(200).send("You got the notes!");
};

const postNotes = (req,res) => {
    res.status(201).json({
        message : "Post created successfully",
    })
};

const updateNote = (req,res) => {
    res.status(201).json({
        message : "Post updated successfully",
    })    
};

const deleteNote = (req,res) => {
    res.status(201).json({
        message : "Post deleted successfully",
    })    
};



module.exports ={ 
    getAllNotes,
    postNotes,
    updateNote,
    deleteNote
}