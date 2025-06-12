import React from 'react';
import {PlusIcon} from 'lucide-react';
import { Link } from 'react-router';
import { PenTool } from 'lucide-react';

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-green-800 font-mono tracking-tighter'>
                    <span className="inline-flex items-center">
                        <PenTool className="w-6 h-6 mr-2" />
                    </span>Silent<span className=' text-primary'>Post</span>
                </h1>

                <div className='flex items-center gap-4'>
                    <Link to = {"/create"} className='btn btn-primary'>
                        <PlusIcon className='size-5'/>
                        <span>Note</span>
                    </Link>
                </div>
            </div>

        </div>
    </header>
  )
}

export default Navbar