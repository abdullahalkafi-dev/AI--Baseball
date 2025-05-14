import { z } from "zod";

const createUser = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name can't be more than 100 characters")
        .trim(),
      email: z.string().email("Invalid email address").trim().toLowerCase(),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password can't be more than 50 characters")
        .trim(),
      role: z.enum(["ADMIN", "USER"]).optional().default("USER"),
      birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
      address: z.string(),
      phoneNumber: z.string().trim(),
      image: z.string().optional(),
      fcmToken: z.string().nullable().optional(),
      status: z.enum(["active", "delete"]).optional().default("active"),
      verified: z.boolean().optional().default(false),
    })
    .strict(),
});

const updateUser = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name can't be more than 100 characters")
        .trim()
        .optional(),
      phoneNumber: z.string().trim().optional(),
      birthDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format",
        })
        .optional(),
      address: z.string().optional(),
      image: z.string().nullable().optional(),
      fcmToken: z.string().nullable().optional(),
    })
    .strict(),
});

const updateUserActivationStatus = z.object({
  body: z
    .object({
      status: z.enum(["active", "delete"]),
    })
    .strict(),
});

const updateUserRole = z.object({
  body: z
    .object({
      role: z.enum(["ADMIN", "USER"]),
    })
    .strict(),
});

const resetPassword = z.object({
  body: z
    .object({
      email: z.string().email("Invalid email address").trim().toLowerCase(),
    })
    .strict(),
});

const changePassword = z.object({
  body: z
    .object({
      currentPassword: z.string().trim(),
      newPassword: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password can't be more than 50 characters")
        .trim(),
    })
    .strict(),
});

export const UserValidation = {
  createUser,
  updateUser,
  updateUserActivationStatus,
  updateUserRole,
  resetPassword,
  changePassword,
};
