import { StatusCodes } from "http-status-codes";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { 
  TCreateNotification, 
  
  TReturnNotification, 
  TUpdateNotification 
} from "./notification.interface";
import { Notification } from "./notification.model";

const createNotification = async (
  notificationData: TCreateNotification
): Promise<TReturnNotification.createNotification> => {
  const newNotification = await Notification.create(notificationData);
  return newNotification;
};

const getAllNotifications = async (
  query: Record<string, unknown>,
  userId?: string
): Promise<TReturnNotification.getAllNotification> => {
  let filter = {};
  
  // If userId is provided (from auth middleware), filter by userId
  if (userId) {
    filter = { userId };
  }

  const notificationQuery = new QueryBuilder(
    Notification.find(filter),
    query
  )
    .search(["title", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await notificationQuery.modelQuery;
  const meta = await notificationQuery.countTotal();

  return { result, meta };
};

const getNotificationById = async (
  id: string,
  userId?: string
): Promise<TReturnNotification.getSingleNotification> => {
  let filter: any = { _id: id };
  
  // If userId is provided, ensure user can only access their own notifications
  if (userId) {
    filter.userId = userId;
  }

  const notification = await Notification.findOne(filter);
  
  if (!notification) {
    throw new AppError(StatusCodes.NOT_FOUND, "Notification not found");
  }

  return notification;
};

const updateNotification = async (
  id: string,
  updateData: TUpdateNotification,
  userId?: string
): Promise<TReturnNotification.updateNotification> => {
  let filter: any = { _id: id };
  
  // If userId is provided, ensure user can only update their own notifications
  if (userId) {
    filter.userId = userId;
  }

  const updatedNotification = await Notification.findOneAndUpdate(
    filter,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedNotification) {
    throw new AppError(StatusCodes.NOT_FOUND, "Notification not found");
  }

  return updatedNotification;
};

const deleteNotification = async (id: string, userId?: string): Promise<void> => {
  let filter: any = { _id: id };
  
  // If userId is provided, ensure user can only delete their own notifications
  if (userId) {
    filter.userId = userId;
  }

  const deletedNotification = await Notification.findOneAndDelete(filter);

  if (!deletedNotification) {
    throw new AppError(StatusCodes.NOT_FOUND, "Notification not found");
  }
};

const markAsRead = async (
  id: string,
  userId?: string
): Promise<TReturnNotification.updateNotification> => {
  return await updateNotification(id, { isRead: true }, userId);
};

const markAllAsRead = async (userId: string): Promise<{ modifiedCount: number }> => {
  const result = await Notification.updateMany(
    { userId, isRead: false },
    { isRead: true }
  );

  return { modifiedCount: result.modifiedCount };
};

const getUnreadCount = async (userId: string): Promise<{ count: number }> => {
  const count = await Notification.countDocuments({ userId, isRead: false });
  return { count };
};

const getUserNotifications = async (
  userId: string,
  query: Record<string, unknown>
): Promise<TReturnNotification.getAllNotification> => {
  const notificationQuery = new QueryBuilder(
    Notification.find(),
    query
  )
    .search(["message"])
    .filter()
    .sort()
    .paginate()
    .fields();

//   const notificationQuery = new QueryBuilder(
//     Notification.find({ userId }),
//     query
//   )
//     .search(["title", "description"])
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

  const result = await notificationQuery.modelQuery;
  const meta = await notificationQuery.countTotal();
  return { result, meta };
};

export const NotificationServices = {
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
