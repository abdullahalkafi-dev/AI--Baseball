import { Nutrition } from "./nutrition.model";
import { Types } from "mongoose";
import { TNutrition } from "./nutrition.interface";

/**
 * Create a new nutrition entry
 * @param nutritionData
 * @returns Created nutrition document
 */
const createNutrition = async (
  nutritionData: TNutrition
): Promise<TNutrition> => {

    console.log(nutritionData);

  const isAlreadyExist = await Nutrition.isExistNutritionByDateAndUserId(
    nutritionData.user.toString(),
    nutritionData.date
  );
  if (isAlreadyExist) {
    throw new Error("Nutrition entry for this date already exists");
  }
  const newNutrition = await Nutrition.create(nutritionData);
  return newNutrition;
};

/**
 * Get nutrition by ID
 * @param id Nutrition ID
 * @returns Nutrition document or null
 */
const getNutritionById = async (id: string): Promise<TNutrition | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Nutrition ID");
  }
  return await Nutrition.isExistNutritionById(id);
};

/**
 * Get nutrition by user ID
 * @param userId User ID
 * @returns Nutrition document or null
 */
const getNutritionByUserId = async (
  userId: string
): Promise<TNutrition | null> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User ID");
  }
  return await Nutrition.isExistNutritionByUserId(userId);
};

/**
 * Get nutrition by date
 * @param date Date to search for
 * @returns Nutrition document or null
 */
const getNutritionByDate = async (date: Date): Promise<TNutrition | null> => {
  return await Nutrition.isExistNutritionByDate(date);
};

/**
 * Get all nutrition entries for a user
 * @param userId User ID
 * @returns Array of nutrition documents
 */
const getAllNutritionByUserId = async (
  userId: string
): Promise<TNutrition[]> => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User ID");
  }
  return await Nutrition.find({ user: userId }).sort({ date: -1 }).lean();
};

/**
 * Update nutrition by ID
 * @param id Nutrition ID
 * @param updateData Data to update
 * @returns Updated nutrition document
 */
const updateNutrition = async (
  id: string,
  updateData: Partial<TNutrition>
): Promise<TNutrition | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Nutrition ID");
  }
  return await Nutrition.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).lean();
};

/**
 * Delete nutrition by ID
 * @param id Nutrition ID
 * @returns Deleted nutrition document or null
 */
const deleteNutrition = async (id: string): Promise<TNutrition | null> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Nutrition ID");
  }
  return await Nutrition.findByIdAndDelete(id).lean();
};

/**
 * Get nutrition entries within a date range
 * @param userId User ID
 * @param startDate Start date
 * @param endDate End date
 * @returns Array of nutrition documents
 */
const getNutritionByDateRange = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<TNutrition[]> => {
  return await Nutrition.find({
    user: userId,
    date: {
      $gte: new Date(startDate.setHours(0, 0, 0, 0)),
      $lte: new Date(endDate.setHours(23, 59, 59, 999)),
    },
  })
    .sort({ date: -1 })
    .lean();
};


export const nutritionService = {
  createNutrition,
  getNutritionById,
  getNutritionByUserId,
  getNutritionByDate,
  getAllNutritionByUserId,
  updateNutrition,
  deleteNutrition,
  getNutritionByDateRange,
};
