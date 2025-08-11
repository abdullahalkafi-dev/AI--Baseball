import { z } from "zod";

const createNotification = z.object({
  body: z.object({
    userId: z.string().trim().min(1, "User ID is required"),
    message: z
      .string()
      .trim()
      .min(1, "Message must be at least 1 character long")
      .max(1000, "Message can't be more than 1000 characters"),
  }),
});

const updateNotification = z.object({
  body: z.object({
   message: z.string().trim().optional(),
    isRead: z.boolean().optional(),
  }),
});

const markAsRead = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Notification ID is required"),
  }),
});

const getNotificationById = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Notification ID is required"),
  }),
});

const deleteNotification = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Notification ID is required"),
  }),
});

export const NotificationValidation = {
  createNotification,
  updateNotification,
  markAsRead,
  getNotificationById,
  deleteNotification,
};
