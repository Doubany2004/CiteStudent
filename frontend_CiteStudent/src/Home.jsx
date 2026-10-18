import {  Link } from 'react-router-dom'
import './App.css'
import { useState,useEffect } from 'react'


//stokage des donnes
function Home (){


const [etudiant,setEtudiant]=useState([])

// afficher les donner
useEffect(()=>{
    fetch("http://localHost:4000/api/students")
    .then((res)=>res.json())
    .then((data)=>setEtudiant(data))
    .catch((err)=>console.log("erreur",err))
},[])

//les fonctions

 async function supprimer(numero){
    try{
       await fetch(`http://localHost:4000/api/students/${numero}`, {

         method:"DELETE"
       }
           

        )
        setEtudiant(etudiant.filter((e)=>e.numero_etudiant!==numero))
    }
    catch(err){
        console.log("erreur",err)
    }

}
return(
    <div>
<h3>
        Liste des etudiants de la cité
    </h3>
    <div>
        voici la liste de tout les etudiants de la cite avec leur informations
    </div>
    <div className='lienAjouterParent' >
        <Link to={"/addStudent"}  className='lienAjouter'>+ Ajouter un etudiant</Link>
    </div>
    <div>
<table>
<thead>
    <tr className='titre'>
        <th>numero etudiant</th>
        <th>Nom</th>
        <th>Prenom</th>
        <th>Email</th>
        <th>Telepnone</th>
        <th>Programme</th>
        <th>Niveau d'etude</th>
        <th>Annee debut</th>
        <th>Annee fin</th>
        <th>Session</th>
        <th>Action</th>
    </tr>
    </thead>

    <tbody>
        {etudiant.map((e)=>(
            <tr key={e.numero_etudiant}>
                 <td>{e.numero_etudiant}</td>
      <td>{e.nom}</td>
      <td>{e.prenom}</td>
      <td>{e.email}</td>
      <td>{e.telephone}</td>
      <td>{e.programme}</td>
      <td>{e.niveau_etude}</td>
      <td>{e.annee_debut}</td>
      <td>{e.annee_fin}</td>
      <td>{e.session}</td>
      <td>
<Link  to={`/editStudent/${e.numero_etudiant}`}>Mofifier</Link>
<button onClick={()=>{supprimer(e.numero_etudiant)}}>Supprimer</button>

      </td>
                
            </tr>
        ))}
    </tbody>

</table>
    </div>




    </div>
    
)
}

export default Home;