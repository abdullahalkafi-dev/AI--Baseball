import express from "express";
import { NotificationController } from "./notification.controller";
import validateRequest from "../../middlewares/validateRequest";
import { NotificationValidation } from "./notification.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

// Admin routes (without user restriction)
router.post(
  "/",
  validateRequest(NotificationValidation.createNotification),
  NotificationController.createNotification
);

router.get("/admin/all", NotificationController.getAllNotifications);

// User-specific routes (require authentication)
router.get(
  "/my-notifications",
  auth(),
  NotificationController.getUserNotifications
);

router.get(
  "/unread-count",
  auth(),
  NotificationController.getUnreadCount
);

router.patch(
  "/mark-all-read",
  auth(),
  NotificationController.markAllAsRead
);

router.get(
  "/:id",
  auth(),
  validateRequest(NotificationValidation.getNotificationById),
  NotificationController.getNotificationById
);

router.patch(
  "/:id",
  auth(),
  validateRequest(NotificationValidation.updateNotification),
  NotificationController.updateNotification
);

router.delete(
  "/:id",
  auth(),
  validateRequest(NotificationValidation.deleteNotification),
  NotificationController.deleteNotification
);

router.patch(
  "/:id/mark-read",
  auth(),
  validateRequest(NotificationValidation.markAsRead),
  NotificationController.markAsRead
);

export const NotificationRoutes: express.Router = router;
