import mongoose, { Schema } from "mongoose";
import { TNutrition, TNutritionModel } from "./nutrition.interface";

// Create the Nutrition Schema
const NutritionSchema = new Schema<TNutrition, TNutritionModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nutritionScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    proteinScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    caloricScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    consumedImpedingSubstances: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    versionKey: false,
    
  }
);

// Adding static methods
NutritionSchema.statics.isExistNutritionById = async function (
  id: string
): Promise<TNutrition | null> {
  return await this.findById(id).lean();
};

NutritionSchema.statics.isExistNutritionByUserId = async function (
  userId: string
): Promise<TNutrition | null> {
  return await this.findOne({ user: userId }).lean();
};

NutritionSchema.statics.isExistNutritionByDate = async function (
  date: Date
): Promise<TNutrition | null> {
  return await this.findOne({
    date: {
      $gte: new Date(date.setHours(0, 0, 0, 0)),
      $lt: new Date(date.setHours(23, 59, 59, 999)),
    },
  }).lean();
};
NutritionSchema.statics.isExistNutritionByDateAndUserId = async function (
    userId: string,
    date: Date | string
    ): Promise<TNutrition | null> {
    const dateObj = new Date(date);
    const startOfDay = new Date(dateObj);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(dateObj);
    endOfDay.setHours(23, 59, 59, 999);
    
    return await this.findOne({
        user: userId,
        date: {
        $gte: startOfDay,
        $lt: endOfDay,
        },
    }).lean();
    }

export const Nutrition = mongoose.model<TNutrition, TNutritionModel>(
  "Nutrition",
  NutritionSchema
);
