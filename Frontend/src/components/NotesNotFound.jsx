import React from 'react'
import { Construction } from 'lucide-react'
import { ArrowBigUpDash } from 'lucide-react'

const NotesNotFound = () => {
  return (
    <div className='flex justify-center items-center mt-0'>
        <div className='card-body flex-row p-auto mt-0'>
            <Construction className='size-7'/><h1 className='text-primary font-bold'>No notes yet...</h1>
        </div>
    </div>
  )
}

export default NotesNotFound