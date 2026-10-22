 import { useState ,useEffect } from "react"
 import { useNavigate ,useParams} from "react-router-dom"

function EditStudent() {

  const navigate = useNavigate() 
   const { numero_etudiant } = useParams()  // permet d'utiliser le numero dans le url

// stokage de donnée
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

// afficher les presremplis
useEffect(()=>{
    fetch(`http://localHost:4000/api/students/${numero_etudiant}`)
    .then((res)=>res.json())
    .then((data)=>setForm(data[0]))
    .catch((err)=>console.log("erreur",err))
},[])

// fonction qui permet de stoker les  nouvelles informations remplit par l'utilisateur
const handleChange = (e) => {
  const utilisateur = { ...form }                 // copie de la fiche
  utilisateur[e.target.name] = e.target.value     // range la saisie dans la bonne case
  setForm(utilisateur)                            // donne la copie corrigée à setForm
}

// fonction modifier

const modifier=async(e)=>{
   e.preventDefault()
    await fetch(`http://localhost:4000/api/students/${numero_etudiant}`,
    {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(form)
    }
  )
navigate("/")

}

  return (

  <div className="page-formulaire">
   <h3>Modifier les informations d'un étudiant</h3>

    <form onSubmit={modifier} noValidate>

      <div className="champ">
        <label>Numéro d'étudiant</label>
        <input name="numero_etudiant" value={form.numero_etudiant} onChange={handleChange} readOnly />
        
      </div>

      <div className="champ">
        <label>Nom</label>
        <input name="nom" value={form.nom} onChange={handleChange} />
        
      </div>

      <div className="champ">
        <label>Prénom</label>
        <input name="prenom" value={form.prenom} onChange={handleChange} />
        
      </div>

      <div className="champ">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
       
      </div>

      <div className="champ">
        <label>Téléphone</label>
        <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} />
        
      </div>

      <div className="champ">
        <label>Programme</label>
        <input name="programme" value={form.programme} onChange={handleChange} />
        
      </div>

      <div className="champ">
        <label>Niveau d'étude</label>
        <input name="niveau_etude" value={form.niveau_etude} onChange={handleChange} />
        
      </div>

      <div className="champ">
        <label>Année de début</label>
        <input name="annee_debut" value={form.annee_debut} onChange={handleChange} />
        
      </div>

      <div className="champ">
        <label>Année de fin</label>
        <input name="annee_fin" value={form.annee_fin} onChange={handleChange} />
        
      </div>

      <div className="champ">
        <label>Session</label>
        <input name="session" value={form.session} onChange={handleChange} />
        
      </div>

      <button type="submit">Modifier</button>
    </form>
  </div>
)



}

export default EditStudent