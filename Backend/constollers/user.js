// On utilise l'algorithme bcrypt pour hasher le mot de passe des utilisateurs
const bcrypt = require('bcrypt');

// On utilise le package jsonwebtoken pour attribuer un token à un utilisateur au moment ou il se connecte
const jwt = require('jsonwebtoken');


// On récupère notre model User ,créer avec le schéma mongoose
const User = require('../models/Users');


// Middleware pour crée un nouvel utilisateur
// On sauvegarde un nouvel utilisateur et crypte son mot de passe avec un hash généré par bcrypt
exports.signup = (req, res, next) => {
  // On appelle la méthode hash de bcrypt et on lui passe le mdp de l'utilisateur, le salte (10) ce sera le nombre de tours qu'on fait faire à l'algorithme
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        // On passe l'email qu'on trouve dans le corps de la requête
        email: req.body.email,
        // On récupère le mdp hashé de bcrypt
        password: hash
      })
      user.save()
         // On enregistre l'utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error })); // Si il existe déjà un utilisateur avec cette adresse email
    })
    .catch(error => res.status(500).json({ error }));
};

// Le Middleware pour la connexion d'un utilisateur vérifie si l'utilisateur existe dans la base MongoDB lors du login
//si oui il vérifie son mot de passe, s'il est bon il renvoie un TOKEN contenant l'id de l'utilisateur, sinon il renvoie une erreur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
       // On utilise bcrypt pour comparer les hashs et savoir si ils ont la même string d'origine
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              // Si false, c'est que ce n'est pas le bon utilisateur, ou le mot de passe est incorrect
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              // Permet de vérifier si la requête est authentifiée
            // on va pouvoir obtenir un token encodé pour cette authentification grâce à jsonwebtoken, on va créer des tokens et les vérifier
              token: jwt.sign(
                { userId: user._id},
                'RANDOM_TOKEN_P6',// Clé d'encodage du token qui peut être rendue plus complexe en production
                {expiresIn: '24h'}// Argument de configuration avec une expiration au bout de 24h
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
  };