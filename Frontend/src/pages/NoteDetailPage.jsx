import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'

const NoteDetailPage = () => {
  const [note, setNote]= useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate('');
  const {id} = useParams();
  console.log({id});

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);
      } catch (error) {
        if(error.status === 429) {
          toast.error("Too many request, try again later");
          return; 
        }
        console.log(error);
        toast.error("Failed to fetch note");
      } finally{
        setLoading(false);
      }
    }
  fetchNote();
  },[id]);

  const handleDelete = async() => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the note")
    } 
  }

  const handleSave = async() => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please provide a title and content");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`,note);
      toast.success("Note updated successfully");
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Failed to update note");
    }finally{
      setSaving(false);
    }
  }

  // Loading animation 
  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'></LoaderIcon>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex item-center justify-between mb-6'>
            <Link to ='/' className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5'/>
              Delete Note
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text" placeholder='Note title' className='input input-bordered' value={note.title} 
                onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea  placeholder='Write your note here...' className='textarea textarea-bordered h-32' value={note.content} 
                onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>
            </div>
        <div className='card-actions justify-end'>
          <button type="submit" className='btn btn-primary m-3' disabled={saving} onClick={handleSave}>
            {saving? "Saving....": "Save changes"}
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage