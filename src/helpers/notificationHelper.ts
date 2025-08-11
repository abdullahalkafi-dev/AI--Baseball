import { NotificationServices } from "../app/modules/notification/notification.service";
import { TCreateNotification } from "../app/modules/notification/notification.interface";

/**
 * Helper service for creating notifications from other parts of the application
 */
export class NotificationHelper {
  /**
   * Create a notification for a user
   */
  static async createUserNotification(userId: string, message: string) {
    try {
      const notificationData: TCreateNotification = {
        userId,
        message,
      };

      return await NotificationServices.createNotification(notificationData);
    } catch (error) {
      console.error("Error creating notification:", error);
      // Don't throw error to prevent breaking the main operation
    }
  }

  /**
   * Create a welcome notification for new users
   */
  static async createWelcomeNotification(userId: string, userName: string) {
    return this.createUserNotification(userId, "Welcome to AI Baseball!");
  }

  /**
   * Create a daily log reminder notification
   */
  static async createDailyLogReminder(userId: string) {
    return this.createUserNotification(userId, "Daily Log Reminder");
  }

  /**
   * Create a daily log reminder notification
   */
  static async createSystemNotification(userIds: string[], message: string) {
    const promises = userIds.map((userId) =>
      this.createUserNotification(userId, message)
    );

    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.error("Error creating system notifications:", error);
    }
  }
}

export default NotificationHelper;
