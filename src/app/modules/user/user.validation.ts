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
      levelOfSport: z.string().trim(),
      playerType: z.string().trim(),
      ThreeWordThtDescribeYou: z.string(),
      birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
      HowOftenDoYouJournal: z.enum([
        "Never tried it",
        "Dabbled a little",
        "Pretty consistent",
      ]),
      role: z.enum(["ADMIN", "USER"]).optional().default("USER"),
      address: z.string().optional(),
      phoneNumber: z.string().trim().optional(),
      image: z.string().optional(),
      fcmToken: z.string().nullable().optional(),
      status: z.enum(["active", "delete"]).optional().default("active"),
      verified: z.boolean().optional().default(false),
    })
    .strict(),
});

const updateUser = z.object({
  data: z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name can't be more than 100 characters")
        .trim()
        .optional(),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password can't be more than 50 characters")
        .trim()
        .optional(),
      levelOfSport: z.string().trim().optional(),
      playerType: z.string().trim().optional(),
      ThreeWordThtDescribeYou: z.string().optional(),
      birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }).optional(),
      HowOftenDoYouJournal: z.enum([
        "Never tried it",
        "Dabbled a little",
        "Pretty consistent",
      ]).optional(),
      role: z.enum(["ADMIN", "USER"]).optional(),
      address: z.string().optional(),
      phoneNumber: z.string().trim().optional(),
      image: z.string().optional(),
      fcmToken: z.string().nullable().optional(),
      status: z.enum(["active", "delete"]).optional(),
      
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
