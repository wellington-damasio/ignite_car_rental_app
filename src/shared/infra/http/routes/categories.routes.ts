import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { FindCategoryByIdController } from "../../../../modules/cars/useCases/findCategoryById/findCategoryByIdController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const upload = multer({ dest: "./tmp" });

// ---------------------------------------------
//              List all categories
// ---------------------------------------------
const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", ensureAuthenticated, listCategoriesController.handle);

// ---------------------------------------------
//            Create a new category
// ---------------------------------------------
const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", ensureAuthenticated, createCategoryController.handle);

// ---------------------------------------------
//         Return a specific category (id)
// ---------------------------------------------
const findCategoryByIdController = new FindCategoryByIdController();
categoriesRoutes.get("/:id", ensureAuthenticated, findCategoryByIdController.handle);

// ---------------------------------------------
//      Upload categories from a CSV file
// ---------------------------------------------
const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
