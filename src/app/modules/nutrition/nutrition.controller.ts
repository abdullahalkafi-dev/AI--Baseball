import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import AppError from "../../errors/AppError";
import { nutritionService } from "./nutrition.service";
import { StatusCodes } from "http-status-codes";





/**
 * Create a new nutrition entry
 * @route POST /api/nutrition
 */
const createNutrition = catchAsync(async (req: Request, res: Response) => {
    const nutritionData = req.body;
    // Assign the user ID from authenticated user
    nutritionData.user = req.user?.id;

   console.log(nutritionData);    
    const newNutrition = await nutritionService.createNutrition(nutritionData);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Nutrition entry created successfully",
        data: newNutrition,
    });
});






/**
 * Get nutrition by ID
 * @route GET /api/nutrition/:id
 */
const getNutritionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const nutrition = await nutritionService.getNutritionById(id);

  if (!nutrition) {
    throw new AppError(StatusCodes.NOT_FOUND, "Nutrition not found");
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Nutrition retrieved successfully",
    data: nutrition,
  });
});

/**
 * Get all nutrition entries for the logged-in user
 * @route GET /api/nutrition
 */
const getAllNutrition = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const nutritionEntries = await nutritionService.getAllNutritionByUserId(
    userId
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Nutrition entries retrieved successfully",
    data: nutritionEntries,
  });
});

/**
 * Get nutrition entries within a date range
 * @route GET /api/nutrition/range
 */
const getNutritionByDateRange = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;


    const { startDate, endDate } = req.query;
    console.log({ startDate, endDate });
    console.log( new Date(startDate as string),
    new Date(endDate as string));
    const nutritionEntries = await nutritionService.getNutritionByDateRange(
      userId,
      new Date(startDate as string),
      new Date(endDate as string)
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Nutrition entries retrieved successfully",
      data: nutritionEntries,
    });
  }
);

/**
 * Update nutrition by ID
 * @route PUT /api/nutrition/:id
 */
const updateNutrition = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedNutrition = await nutritionService.updateNutrition(
    id,
    updateData
  );

  if (!updatedNutrition) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Nutrition not found",
    });
    return;
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Nutrition updated successfully",
    data: updatedNutrition,
  });
});

/**
 * Delete nutrition by ID
 * @route DELETE /api/nutrition/:id
 */
const deleteNutrition = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedNutrition = await nutritionService.deleteNutrition(id);

  if (!deletedNutrition) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: "Nutrition not found",
    });
    return;
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Nutrition deleted successfully",
    data: deletedNutrition,
  });
});

export const NutritionController = {

    getNutritionById,
    getAllNutrition,
    getNutritionByDateRange,
    updateNutrition,
    deleteNutrition,
    createNutrition
    };