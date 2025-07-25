import { PenSquareIcon, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'



const NoteCard = ({note, setNotes}) => {

    const handleDelete = async(e, id) => {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete the note?")) return;
        const userPassword = window.prompt("Enter the password: ");
        try{
        const response = await axios.post("http://localhost:3000/api/delete", {
            password : userPassword
        })
        if (response.status === 200) {
            console.log("Authenticated");
        }
        } catch(error) {
        console.error("Authentication failed ",error);
        toast.error("Unauthorized for this activity");
        return; 
        }
        // Create mechanism to handle the deletion from admin only
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Successfully deleted the note");
            setNotes((prev) => prev.filter(note => note._id !== id)); // Get rid of deleted note
        } catch (error) {
            toast.error("Failed to delete the note");
            console.log("Error in deleting the note", error);
        }
    }

  return (
    <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e)=>handleDelete(e,note._id)}>
                        <Trash2 className='size-4'></Trash2>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard