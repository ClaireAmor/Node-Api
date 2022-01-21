const express = require("express");
const router = express.Router();
const validator = require("../validators/moviesValidators");

// Toute les route de movies
const routeMovies = (db) => {
  // Affichage de tous les films
  router.get("/", (req, res) => {
    db.collection("movies")
      .get()
      .then((snapshotMovies) => {
        let allMovies = [];
        snapshotMovies.forEach((doc) => {
          allMovies.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        res.send(allMovies);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  // Affichage d'un film grace à son id
  router.get("/:id", (req, res) => {
    db.collection("movies")
      .doc(req.params.id)
      .get()
      .then((movie) => {
        res.status(200).json({
          id: movie.id,
          ...movie.data(),
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  // Création d'un film
  router.post("/", validator.moviesValidator, function (req, res) {
    db.collection("movies")
      .add({
        name: req.body.name,
        author: req.body.author,
        img: encodeURI(req.body.img),
        video: encodeURI(req.body.video),
        category: req.body.category,
        description: req.body.description,
        likes: 0,
      })
      .then((response) => {
        res.send("Film ajouté");
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  // Modifier un film avec son id
  router.patch("/:id", validator.moviesValidator, (req, res) => {
    db.collection("movies")
      .doc(req.params.id)
      .update({
        name: req.body.name,
        author: req.body.author,
        img: encodeURI(req.body.img),
        video: encodeURI(req.body.video),
        category: req.body.category,
        description: req.body.description,
        likes: 0,
      })
      .then((response) => {
        res.send("Film modifié");
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  // Ajout d'un like sur un film
  router.patch("/:id/likes", (req, res) => {
    const ref = db.collection("movies").doc(req.params.id);
    ref.get().then((movie) => {
      const data = movie.data();
      ref
        .update({
          likes: data.likes + 1,
        })
        .then(() => {
          ref
            .get()
            .then((movie) => res.send("like total " + movie.data().likes));
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });

  //Effacer un film avec son id
  router.delete("/:id", (req, res) => {
    db.collection("movies")
      .doc(req.params.id)
      .delete()
      .then((response) => {
        res.status(200).json({
          message: response,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  return router;
};

module.exports = routeMovies;
