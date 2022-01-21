const { body, validationResult } = require("express-validator");

// Toutes les validations pour la création et la modification d'un film
exports.moviesValidator = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("The name field is empty")
    .exists()
    .withMessage("Movie's name is required")
    .isString()
    .withMessage("Only caracters please")
    .isLength({ max: 64 })
    .withMessage("Name is too long"),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    }
    next();
  },
  body("author")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("the author field is empty")
    .exists()
    .withMessage("Author's name is required")
    .isString()
    .withMessage("Only caracters please")
    .isLength({ max: 64 })
    .withMessage("Author's name is too long"),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    }
    next();
  },
  body("img")
    .trim()
    .notEmpty()
    .withMessage("the img field is empty")
    .exists()
    .withMessage("Img's URL is required")
    .isURL()
    .withMessage("Only URL please")
    .isLength({ max: 2083 })
    .withMessage("URL's image is too long"),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    }
    next();
  },
  body("video")
    .trim()
    .notEmpty()
    .withMessage("the video field is empty")
    .exists()
    .withMessage("Video's URL is required")
    .isURL()
    .withMessage("Only URL please")
    .isLength({ max: 2083 })
    .withMessage("URL's video is too long"),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    }
    next();
  },
  body("category")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("the category field is empty")
    .exists()
    .withMessage("category's name is required")
    .isString()
    .withMessage("Only caracters please")
    .isLength({ min: 20, max: 20 })
    .withMessage("category's name need 20 caracters"),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    }
    next();
  },
  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("the description field is empty")
    .exists()
    .withMessage("description's name is required")
    .isString()
    .withMessage("Only caracters please")
    .isLength({ max: 255 })
    .withMessage("description's is too long"),
  function (req, res, next) {
    var errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        title: "an error occured",
        error: errorValidation.array(),
      });
    }
    next();
  },
];
