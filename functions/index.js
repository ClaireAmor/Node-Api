const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const moviesRouter = require("./routers/movies.router");
const categoriesRouter = require("./routers/categories.router");

// Initialize in order to access its services
admin.initializeApp(functions.config().firebase);

//  Initialize the database
const db = admin.firestore();

// Initialiser server express js et afficher doc.data
const app = express();

// Route des films
app.use("/v1/movies", moviesRouter(db));
// Route des catégories
app.use("/v1/categories", categoriesRouter(db));

exports.api = functions.region("europe-west3").https.onRequest(app);
