import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DailyLogService } from "./dailyLog.service";
import AppError from "../../errors/AppError";

// Create a daily log
const createDailyLog = catchAsync(async (req: Request, res: Response) => {
  const result = await DailyLogService.createDailyLog(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Daily log created successfully",
    data: result,
  });
});

// Get all daily logs for a user
const getDailyLogsByUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await DailyLogService.getDailyLogsByUser(userId, req.query);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Daily logs retrieved successfully",
    data: result,
  });
});

// Get daily log by ID
const getDailyLogById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DailyLogService.getDailyLogById(id);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Daily log retrieved successfully",
    data: result,
  });
});

// Get daily log by user and date
const getDailyLogByUserAndDate = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { date } = req.query;
  
  if (!date) {
 throw new AppError(
      StatusCodes.BAD_REQUEST,
        "Date is required"
    );
  }
  
  const result = await DailyLogService.getDailyLogByUserAndDate(userId, new Date(date as string));
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Daily log retrieved successfully",
    data: result,
  });
});

// Update daily log
const updateDailyLog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DailyLogService.updateDailyLog(id, req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Daily log updated successfully",
    data: result,
  });
});

// Delete daily log
const deleteDailyLog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DailyLogService.deleteDailyLog(id);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Daily log deleted successfully",
    data: result,
  });
});

export const DailyLogController = {
  createDailyLog,
  getDailyLogsByUser,
  getDailyLogById,
  getDailyLogByUserAndDate,
  updateDailyLog,
  deleteDailyLog,
};