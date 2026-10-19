import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Routes,Route, Form} from "react-router-dom"
import Home from "./Home"
import AddStudent from './addStudent'
import EditStudent from "./editStudent"



function App(){
  return(
    
    <Routes>
<Route path='/' element= {< Home />}/>
<Route path='/addStudent' element= { < AddStudent  />} />
<Route path='editStudent/:numero_etudiant' element= { < EditStudent />} />
    </Routes>
    

  )

}
export default App;