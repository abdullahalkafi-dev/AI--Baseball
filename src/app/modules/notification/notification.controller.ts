import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotificationServices } from "./notification.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notification = await NotificationServices.createNotification(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Notification created successfully",
    data: notification,
  });
});

const getAllNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  const notificationsRes = await NotificationServices.getAllNotifications(
    req.query,
    userId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notifications retrieved successfully",
    data: notificationsRes.result,
    meta: notificationsRes.meta,
  });
});

const getNotificationById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  const notification = await NotificationServices.getNotificationById(
    req.params.id,
    userId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notification retrieved successfully",
    data: notification,
  });
});

const updateNotification = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  const notification = await NotificationServices.updateNotification(
    req.params.id,
    req.body,
    userId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notification updated successfully",
    data: notification,
  });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  await NotificationServices.deleteNotification(req.params.id, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notification deleted successfully",
    data: null,
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  const notification = await NotificationServices.markAsRead(
    req.params.id,
    userId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Notification marked as read",
    data: notification,
  });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  const result = await NotificationServices.markAllAsRead(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All notifications marked as read",
    data: result,
  });
});

const getUnreadCount = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  const result = await NotificationServices.getUnreadCount(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Unread count retrieved successfully",
    data: result,
  });
});

const getUserNotifications = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // From auth middleware
  const notificationsRes = await NotificationServices.getUserNotifications(
    userId,
    req.query
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User notifications retrieved successfully",
    data: notificationsRes.result,
    meta: notificationsRes.meta,
  });
});

export const NotificationController = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  getUserNotifications,
};
