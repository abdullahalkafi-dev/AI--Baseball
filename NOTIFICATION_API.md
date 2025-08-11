# Notification API Documentation

## Overview
The Notification API provides complete CRUD operations for managing user notifications in the AI Baseball application.

## Base URL
```
/api/v1/notifications
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Create Notification (Admin Only)
**POST** `/`

Creates a new notification.

**Request Body:**
```json
{
  "userId": "string (required)",
  "title": "string (required, max 200 chars)",
  "description": "string (required, max 1000 chars)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification created successfully",
  "data": {
    "_id": "notification_id",
    "userId": "user_id",
    "title": "Notification Title",
    "description": "Notification Description",
    "isRead": false,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 2. Get All Notifications (Admin Only)
**GET** `/admin/all`

Retrieves all notifications in the system with optional filtering, sorting, and pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)
- `sort`: Sort field (e.g., `-createdAt` for descending)
- `search`: Search in title and description
- `isRead`: Filter by read status (true/false)

**Response:**
```json
{
  "success": true,
  "message": "Notifications retrieved successfully",
  "data": [...notifications],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalPage": 5,
    "total": 50
  }
}
```

### 3. Get User's Notifications
**GET** `/my-notifications` (Authentication Required)

Retrieves all notifications for the authenticated user.

**Query Parameters:** Same as above

**Response:** Same structure as Get All Notifications

### 4. Get Unread Count
**GET** `/unread-count` (Authentication Required)

Gets the count of unread notifications for the authenticated user.

**Response:**
```json
{
  "success": true,
  "message": "Unread count retrieved successfully",
  "data": {
    "count": 5
  }
}
```

### 5. Mark All Notifications as Read
**PATCH** `/mark-all-read` (Authentication Required)

Marks all unread notifications as read for the authenticated user.

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read",
  "data": {
    "modifiedCount": 3
  }
}
```

### 6. Get Single Notification
**GET** `/:id` (Authentication Required)

Retrieves a specific notification by ID (only user's own notifications).

**Response:**
```json
{
  "success": true,
  "message": "Notification retrieved successfully",
  "data": {
    "_id": "notification_id",
    "userId": "user_id",
    "title": "Notification Title",
    "description": "Notification Description",
    "isRead": false,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 7. Update Notification
**PATCH** `/:id` (Authentication Required)

Updates a specific notification (only user's own notifications).

**Request Body:**
```json
{
  "title": "Updated Title (optional)",
  "description": "Updated Description (optional)",
  "isRead": true
}
```

**Response:** Same structure as Get Single Notification

### 8. Delete Notification
**DELETE** `/:id` (Authentication Required)

Deletes a specific notification (only user's own notifications).

**Response:**
```json
{
  "success": true,
  "message": "Notification deleted successfully",
  "data": null
}
```

### 9. Mark Single Notification as Read
**PATCH** `/:id/mark-read` (Authentication Required)

Marks a specific notification as read.

**Response:** Same structure as Get Single Notification

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message",
  "errorSources": [...validation_errors]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Notification not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Usage Examples

### Creating a notification (Admin)
```javascript
const response = await fetch('/api/v1/notifications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify({
    userId: 'user123',
    title: 'Welcome!',
    description: 'Welcome to AI Baseball!'
  })
});
```

### Getting user notifications
```javascript
const response = await fetch('/api/v1/notifications/my-notifications?page=1&limit=10', {
  headers: {
    'Authorization': 'Bearer your-jwt-token'
  }
});
```

### Marking all as read
```javascript
const response = await fetch('/api/v1/notifications/mark-all-read', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer your-jwt-token'
  }
});
```

## Helper Service

The application also includes a `NotificationHelper` service for creating notifications programmatically from other parts of the application:

```javascript
import NotificationHelper from '../helpers/notificationHelper';

// Create a custom notification
await NotificationHelper.createUserNotification(userId, 'Title', 'Description');

// Create a welcome notification
await NotificationHelper.createWelcomeNotification(userId, userName);

// Create a daily log reminder
await NotificationHelper.createDailyLogReminder(userId);

// Create system-wide notifications
await NotificationHelper.createSystemNotification(userIds, 'Title', 'Description');
```

## Database Schema

The notification model includes:
- `userId`: Reference to the user
- `title`: Notification title (max 200 chars)
- `description`: Notification description (max 1000 chars)
- `isRead`: Boolean flag for read status (default: false)
- `createdAt`: Auto-generated timestamp
- `updatedAt`: Auto-generated timestamp

Indexes are created on `userId + createdAt` and `userId + isRead` for optimal query performance.
