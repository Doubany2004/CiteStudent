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
return (
  <div className="page-liste">
    <h3>Liste des étudiants de la cité</h3>

    <p className="intro">
      Voici la liste de tous les étudiants de la cité avec leurs informations
    </p>

    <div className="lienAjouterParent">
      <Link to="/addStudent" className="lienAjouter">+ Ajouter un étudiant</Link>
    </div>

    <div className="carte-tableau">
      <table>
        <thead>
          <tr className="titre">
            <th>Numéro étudiant</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Programme</th>
            <th>Niveau d'étude</th>
            <th>Année début</th>
            <th>Année fin</th>
            <th>Session</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {etudiant.map((e) => (
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
              <td className="actions">
                <Link to={`/editStudent/${e.numero_etudiant}`} className="btn-modifier">
                  Modifier
                </Link>
                <button className="btn-supprimer" onClick={() => supprimer(e.numero_etudiant)}>
                  Supprimer
                </button>
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