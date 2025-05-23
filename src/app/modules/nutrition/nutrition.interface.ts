import { Model, Types } from "mongoose";

export type TNutrition = {
  user: Types.ObjectId;
  nutritionScore: number;
  proteinScore: number;
  caloricScore: number;
  consumedImpedingSubstances: boolean;
  date: Date;
};
export type TNutritionModel = {
  isExistNutritionById(id: string): any;
  isExistNutritionByUserId(userId: string): any;
  isExistNutritionByDate(date: Date): any;
  isExistNutritionByDateAndUserId(userId: string, date: Date): any;
} & Model<TNutrition>;
