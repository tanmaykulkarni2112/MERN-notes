import React from 'react'
import { Routes , Route} from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';
import {Toaster, toast} from 'react-hot-toast';

const App = () => {
  return (
    <div class="relative h-full w-full bg-black">
  <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#0f0_100%)]"/>      
  <Routes>
        <Route path = '/' element = {<HomePage/>} />
        <Route path ='/create' element = {<CreatePage/>} />
        <Route path ='/note/:id' element = {<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App
