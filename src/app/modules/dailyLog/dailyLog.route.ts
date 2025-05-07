import express, { Router } from 'express';
import { DailyLogController } from './dailyLog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DailyLogValidation } from './dailyLog.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create dailyLog - requires auth and validation
router.post(
  '/',
  auth('USER', 'ADMIN'),
  validateRequest(DailyLogValidation.createDailyLog),
  DailyLogController.createDailyLog
);

// Get all dailyLogs for a specific user
router.get(
  '/user/:userId',
  auth('USER', 'ADMIN'),
  DailyLogController.getDailyLogsByUser
);

// Get dailyLog by ID
router.get(
  '/:id',
  auth('USER', 'ADMIN'),
  DailyLogController.getDailyLogById
);

// Get dailyLog by user and date
router.get(
  '/user/:userId/date',
  auth('USER', 'ADMIN'),
  DailyLogController.getDailyLogByUserAndDate
);

// Update dailyLog
router.patch(
  '/:id',
  auth('USER', 'ADMIN'),
  validateRequest(DailyLogValidation.updateDailyLog),
  DailyLogController.updateDailyLog
);

// Delete dailyLog
router.delete(
  '/:id',
  auth('USER', 'ADMIN'),
  DailyLogController.deleteDailyLog
);

export const DailyLogRoutes:Router = router;