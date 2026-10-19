
import './App.css'
import { useState,useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'

function AddStudent(){
const navigate=useNavigate();
const [erreur,setErreur]=useState({})

const [form,setForm]=useState({

     numero_etudiant: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    programme: '',
    niveau_etude: '',
    annee_debut: '',
    annee_fin: '',
    session: '',
})

// fonction qui permet de stoker les informations remplit par l'utilisateur
const handleChange = (e) => {
  const utilisateur = { ...form }                 // copie de la fiche
  utilisateur[e.target.name] = e.target.value     // range la saisie dans la bonne case
  setForm(utilisateur)                            // donne la copie corrigée à setForm
}

// fonction ajouter
 const ajouter=async (e)=>{
  
    e.preventDefault()
    
    // creation d'un objet pour ajouter les erreur
    const objetErreur={}
    let valide=false
    if(!form.numero_etudiant.trim()){
      objetErreur.numero_etudiant="le numero etudiant est obligatoire"
      valide=true
    }
   if (!form.nom.trim()) {
    objetErreur.nom = "Le nom est obligatoire"
     valide=true
  }
  if (!form.prenom.trim()) {
    objetErreur.prenom = "Le prénom est obligatoire"
     valide=true
  }
  if (!form.email.trim()) {
    objetErreur.email = "L'email est obligatoire"
  valide=true
  }
  if (!form.telephone.trim()) {
    objetErreur.telephone = "Le téléphone est obligatoire"
      valide=true
  }
  if (!form.programme.trim()) {
    objetErreur.programme = "Le programme est obligatoire"
     valide=true
  }
  if (!form.niveau_etude.trim()) {
    objetErreur.niveau_etude = "Le niveau d'étude est obligatoire"
     valide=true
  }
  if (!form.annee_debut.trim()) {
    objetErreur.annee_debut = "L'année de début est obligatoire"
      valide=true
  }
  if (!form.annee_fin.trim()) {
    objetErreur.annee_fin = "L'année de fin est obligatoire"
  valide=true
  }
  if (!form.session.trim()) {
    objetErreur.session = "La session est obligatoire"
    valide=true
  }

  if(valide){
    setErreur(objetErreur)
    return
  }
  setErreur({})
  await fetch("http://localhost:4000/api/students",
    {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(form)
    }
  )
navigate("/")
}

return (
  <div className="page-formulaire">
    <h3>Ajouter un étudiant</h3>

    <form onSubmit={ajouter} noValidate>

      <div className="champ">
        <label>Numéro d'étudiant</label>
        <input name="numero_etudiant" value={form.numero_etudiant} onChange={handleChange} />
        {erreur.numero_etudiant && <p className="erreur">{erreur.numero_etudiant}</p>}
      </div>

      <div className="champ">
        <label>Nom</label>
        <input name="nom" value={form.nom} onChange={handleChange} />
        {erreur.nom && <p className="erreur">{erreur.nom}</p>}
      </div>

      <div className="champ">
        <label>Prénom</label>
        <input name="prenom" value={form.prenom} onChange={handleChange} />
        {erreur.prenom && <p className="erreur">{erreur.prenom}</p>}
      </div>

      <div className="champ">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {erreur.email && <p className="erreur">{erreur.email}</p>}
      </div>

      <div className="champ">
        <label>Téléphone</label>
        <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} />
        {erreur.telephone && <p className="erreur">{erreur.telephone}</p>}
      </div>

      <div className="champ">
        <label>Programme</label>
        <input name="programme" value={form.programme} onChange={handleChange} />
        {erreur.programme && <p className="erreur">{erreur.programme}</p>}
      </div>

      <div className="champ">
        <label>Niveau d'étude</label>
        <input name="niveau_etude" value={form.niveau_etude} onChange={handleChange} />
        {erreur.niveau_etude && <p className="erreur">{erreur.niveau_etude}</p>}
      </div>

      <div className="champ">
        <label>Année de début</label>
        <input name="annee_debut" value={form.annee_debut} onChange={handleChange} />
        {erreur.annee_debut && <p className="erreur">{erreur.annee_debut}</p>}
      </div>

      <div className="champ">
        <label>Année de fin</label>
        <input name="annee_fin" value={form.annee_fin} onChange={handleChange} />
        {erreur.annee_fin && <p className="erreur">{erreur.annee_fin}</p>}
      </div>

      <div className="champ">
        <label>Session</label>
        <input name="session" value={form.session} onChange={handleChange} />
        {erreur.session && <p className="erreur">{erreur.session}</p>}
      </div>

      <button type="submit">Ajouter</button>
    </form>
  </div>
)


}


export default AddStudent


