const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const adminpw = process.env.ADMINPW;

function capitalizeString(str) {
  if (typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const manufacturerValidator = [
  body("name").trim(),
  body("name", "Cannot be empty")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("name", "Cannot contain numbers")
    .isAlpha()
    .withMessage("Name cannot contain numbers"),
  body("name", "Meets length requirements")
    .isLength({ min: 1, max: 30 })
    .withMessage(
      `Name cannot be less than 1 character long or greater than 30 characters long`
    ),
];

const modelValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 1, max: 30 })
    .withMessage(
      `Name cannot be less than 1 character long or greater than 30 characters long`
    ),
  body("year")
    .trim()
    .notEmpty()
    .withMessage("Year cannot be empty")
    .isInt({ min: 1800, max: 9999, allow_leading_zeroes: false })
    .withMessage(
      `Year must be a number between 1800 and 9999 with no leading 0's`
    ),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isInt({ min: 1, max: 9999999, allow_leading_zeroes: false })
    .withMessage(
      `Price must be a number between 1 and 9999999 with no leading 0's`
    ),
  body("imgUrl")
    .trim()
    .notEmpty()
    .withMessage("Image URL cannot be empty")
    .isURL({ require_tld: true })
    .withMessage("Must be a valid URL"),
  body("odometer")
    .trim()
    .notEmpty()
    .withMessage("Odometer cannot be empty")
    .isInt({ min: 1, max: 999999, allow_leading_zeroes: false })
    .withMessage(
      `Odometer must be a number between 1 and 999999 with no leading 0's`
    ),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters long"),
  body("makeKey")
    .trim()
    .notEmpty()
    .withMessage("Manufacturer cannot be empty")
    .isInt()
    .withMessage("Manufacturer ID must be an integer")
    .custom(async (value) => {
      const rows = db.getManufacturerById(value);
      if (rows.length === 0) {
        throw new Error("Invalid manufacturer ID");
      }
      return true;
    }),
];

const getUpdateModel = asyncHandler(async (req, res) => {
  try {
    console.log(req.query.prevpage);
    const allManufacturers = await db.getAllManufacturers();
    const model = await db.getModelById(req.query.modelId);
    res.render("pages/update", {
      title: "Update Model",
      manufacturers: allManufacturers,
      model: model[0],
      prevpage: req.query.prevpage,
    });
  } catch (error) {
    throw new Error(`Failed to update model: ${error}`);
  }
});

const getUpdateManufacturer = asyncHandler(async (req, res) => {
  try {
    const manufacturerName = req.query.name;
    res.render("pages/update", {
      title: "Update Make",
      manufacturer: manufacturerName,
    });
  } catch (error) {
    throw new Error(`Failed to update model: ${error}`);
  }
});

const updateModelById = [
  asyncHandler(async (req, res) => {
    try {
      await db.updateModelById(req.query.id, req.body);
      if (req.query.prevpage === "All models") {
        const allModels = await db.getAllModels();
        res.redirect("/category/all");
      } else {
        const models = await db.getModelsByManufacturer(req.query.prevpage);
        res.redirect(`/category/${req.query.prevpage}`);
      }
    } catch (error) {
      throw new Error(`Failed to update model: ${error}`);
    }
  }),
];

const updateManufacturerByName = [
  manufacturerValidator,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const manufacturerName = req.query.name;
        return res.status(400).render("pages/update", {
          title: "Update Make",
          manufacturer: manufacturerName,
          errors: errors.array(),
        });
      }

      await db.updateManufacturerByName(req.query.name, req.body.name);
      const models = await db.getModelsByManufacturer(req.body.name);
      res.render("pages/category", {
        title: capitalizeString(req.body.name),
        models: models,
        adminpw,
      });
    } catch (error) {
      throw new Error(`Failed to update manufacturer: ${error}`);
    }
  }),
];

module.exports = {
  getUpdateModel,
  updateModelById,
  updateManufacturerByName,
  getUpdateManufacturer,
};
