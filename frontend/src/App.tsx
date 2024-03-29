import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './Elements/Signup'
import { Signin } from './Elements/Signin'
import { Blog } from './Elements/Blog'
import { Blogs } from './Elements/Blogs'
import { Publish } from './Elements/Publish'
import { Toaster } from 'react-hot-toast'
import { Profile } from './Elements/Profile'

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<Navigate to="/signin"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/publish' element={<Publish />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
