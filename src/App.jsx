import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Home'
import Details from './Components/Details'
import Create from './Components/Create';
import Edit from './Components/Edit';


const App = () => {

const {search , pathname} = useLocation()

console.log(search ,pathname);


  return  (
    <div className='h-screen w-screen  flex'>

    {/* {(pathname != "/" || search.length > 0) && <Link to="/" className="fixed top-6 left-6 bg-blue-500 text-white px-4 py-2 rounded-xl 
          shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300
          font-semibold z-50">Home</Link> } */}
     
<Routes>
  

  
    <Route path='/' element={ <Home/> } />
    <Route path='/create' element={ <Create /> } />
    <Route path='/edit/:id' element={ <Edit /> } />  
    <Route path='/details/:id' element={ <Details /> } />
</Routes>
      

      </div>
   
  ) 

};

export default App