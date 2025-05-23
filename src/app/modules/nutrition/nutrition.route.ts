import express, { Router } from 'express';
import { NutritionController } from './nutrition.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth());

// POST route
router.post('/', NutritionController.createNutrition);

// GET routes
router.get('/', NutritionController.getAllNutrition);
router.get('/range', NutritionController.getNutritionByDateRange);
router.get('/:id', NutritionController.getNutritionById);
// PUT route
router.put('/:id', NutritionController.updateNutrition);
// DELETE route
router.delete('/:id', NutritionController.deleteNutrition);
export const NutritionRoutes:Router = router;