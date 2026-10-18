import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Routes,Route, Form} from "react-router-dom"
import Home from "./Home"
//import addStudent from "./addStudent"
//import editStudent from "./editStudent"



function App(){
  return(
    
    <Routes>
<Route path='/' element= {< Home />}/>
<Route path='/addStudent' element= { < addStudent  />} />
<Route path='editStudent/:numero_etudiant' element= { <editStudent />} />
    </Routes>
    

  )

}
export default App;