const { body, validationResult } = require("express-validator");

// Toutes les validations pour la création et la modification d'une catégorie

exports.categoriesValidator = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("The name field is empty")
    .exists()
    .withMessage("Category's name is required")
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
];
