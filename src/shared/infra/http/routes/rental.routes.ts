import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { RentalReturnController } from "../../../../modules/rentals/useCases/rentalReturn/RentalReturnController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)

const rentalReturnController = new RentalReturnController()
rentalsRoutes.post('/return/:id', ensureAuthenticated, rentalReturnController.handle)

const listRentalsByUserController = new ListRentalsByUserController()
rentalsRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle)


export {rentalsRoutes}