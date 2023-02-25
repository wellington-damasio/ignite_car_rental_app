import { Router } from "express";
import multer from "multer";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import ensureAdmin from "../middlewares/ensureAdmin";
import uploadConfig from "../../../../config/upload";

const carsRoutes = Router()
const uploadCarImage = multer(uploadConfig.upload(".tmp/cars"))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/', ensureAuthenticated, ensureAdmin, listAvailableCarsController.handle)

carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, uploadCarImage.array("images"),uploadCarImageController.handle)


export { carsRoutes }