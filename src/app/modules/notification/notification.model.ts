import { model, Schema } from "mongoose";
import { TNotification } from "./notification.interface";

const notificationSchema = new Schema<TNotification>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [1, "Message must be at least 1 character long"],
      maxlength: [1000, "Message can't be more than 1000 characters"],
    },
   
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for better query performance
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1 });

export const Notification = model<TNotification>("Notification", notificationSchema);
