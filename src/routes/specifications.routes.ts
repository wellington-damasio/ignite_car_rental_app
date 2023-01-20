import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/listSpecificationsController";

const specificationsRoutes = Router();
specificationsRoutes.use(ensureAuthenticated);
// ---------------------------------------------
//            List all specifications
// ---------------------------------------------
const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get("/", listSpecificationsController.handle);

// ---------------------------------------------
//          Create a new specification
// ---------------------------------------------
const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
