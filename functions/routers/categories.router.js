const express = require("express");
const router = express.Router();
const validator = require("../validators/categoriesValidators");

// Toute les route de categories
const routeCategories = (db) => {
  // Affichage de tous les catégoriess
  router.get("/", (req, res) => {
    db.collection("categories")
      .get()
      .then((snapshotCategories) => {
        let allCategories = [];
        snapshotCategories.forEach((doc) => {
          allCategories.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        res.send(allCategories);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  // Affichage d'un catégories grace à son id
  router.get("/:id", (req, res) => {
    db.collection("categories")
      .doc(req.params.id)
      .get()
      .then((categorie) => {
        res.status(200).json({
          id: categorie.id,
          ...categorie.data(),
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  // Création d'un catégories
  router.post("/", validator.categoriesValidator, function (req, res) {
    db.collection("categories")
      .add({
        name: req.body.name,
      })
      .then((response) => {
        res.send("Catégorie ajouté");
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  // Modifier un catégories avec son id
  router.put("/:id", validator.categoriesValidator, (req, res) => {
    db.collection("categories")
      .doc(req.params.id)
      .update({
        name: req.body.name,
      })
      .then((response) => {
        res.send("Catégorie modifié");
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

  //Effacer un catégories avec son id
  router.delete("/:id", (req, res) => {
    db.collection("categories")
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

module.exports = routeCategories;
