// importation de dotenv
require('dotenv').config();

// connexion à la base de données
const mysql = require('mysql2');
const baseDonnee = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PassWord,
  database: 'CiteStudent'
});

baseDonnee.connect((err) => {
  if (err) {
    console.log('impossible de se connecter à la base de données');
  } else {
    console.log('connecté à la base de données MySQL');
  }
});

// importation d'express
const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

// afficher les données de la table "students"
app.get('/api/students', (req, res) => {
  baseDonnee.query('SELECT * FROM students', (err, result) => {
    if (err) {
      console.log("impossible d'afficher les données de la table students", err);
      res.status(500).json({ message: 'Erreur lors de la récupération des étudiants' });
    } else {
      res.send(result);
    }
  });
});

// afficher avec l'id
app.get("/api/students/:numero_etudiant",(req,res)=>{
     const numero_etudiant=req.params.numero_etudiant
     const sql=`
     SELECT * FROM students 
     WHERE numero_etudiant=?
     `
     baseDonnee.query(sql,[numero_etudiant],(err,result)=>{
         if (err) {
      console.log("impossible d'afficher les données de la table students", err);
      res.status(500).json({ message: 'Erreur lors de la récupération des étudiants' });
    } else {
      res.send(result);
    }
     })
})

//ajouter un etudiant a la table "etudiant"
app.post("/api/students",(req,res)=>{
    // récupérer les données du corps de la requête 
    const {
        numero_etudiant,
        nom,
        prenom,
        email,
        telephone,
        programme,
        niveau_etude,
        annee_debut,
        annee_fin,
        session,

    }=req.body;

    // cree une requette sql pour insere les informations dans la table students
 const sql=`INSERT INTO students (
 numero_etudiant,
        nom,
        prenom,
        email,
        telephone,
        programme,
        niveau_etude,
        annee_debut,
        annee_fin,
        session
 ) VALUES (?,?,?,?,?,?,?,?,?,?)
  
 `
 // permet a sql d'executer la requette
 baseDonnee.query(sql,
    [
         numero_etudiant,
        nom,
        prenom,
        email,
        telephone,
        programme,
        niveau_etude,
        annee_debut,
        annee_fin,
        session
    ],(err,result)=>{
        if(err){
            console.log("imposible de d'executer la requette")
            res.status(500).json({message: "erreur lors de l'execution de la requette"})
        }
        else{
            res.send(result)
        }
    }

 )

})   
// modifier les informations
app.put("/api/students/:numero_etudiant",(req,res)=>{

    //prendre le numero d'etudiant dans url
    const numero_etudiant=req.params.numero_etudiant

    // recupere les nouvelles informations 
    const {
        nom,
        prenom,
        email,
        telephone,
        programme,
        niveau_etude,
        annee_debut,
        annee_fin,
        session,

    }=req.body;

    // taper la requetten sql
    const sql =`UPDATE students SET
     nom=?,
        prenom=?,
        email=?,
        telephone=?,
        programme=?,
        niveau_etude=?,
        annee_debut=?,
        annee_fin=?,
        session=?
        WHERE numero_etudiant=?
    `
    // executer la requette
    baseDonnee.query(sql,
        [
        nom,
        prenom,
        email,
        telephone,
        programme,
        niveau_etude,
        annee_debut,
        annee_fin,
        session,
        numero_etudiant
        ],(err,result)=>{
            if(err){
                console.log("imposible de modifier",err)
                res.status(500).json({message: "modification imposible"})
            }
            else{
                console.log(result)
                res.send(result)
            }
            
        }
    )
})

// supprimer un etudiant
app.delete("/api/students/:numero_etudiant",(req,res)=>{
    // recuper le numero dans url
    const numero_etudiant=req.params.numero_etudiant

    // executer la requette
    const sql =`
    DELETE FROM students 
    WHERE numero_etudiant=?
    `
    // executer la requette
    baseDonnee.query(sql,[numero_etudiant],(err,result)=>{
        if(err){
            console.log("supression imposible",err)
            res.status(500).json({message: "supression imposible"})
        }
        else{
            res.send(result)
        }
    })
})

// écouter le serveur
app.listen(4000,()=>{
    console.log("le serveur est en cours d'exécution sur le port 4000");
})
