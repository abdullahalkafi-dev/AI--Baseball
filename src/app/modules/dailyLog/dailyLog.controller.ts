import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DailyLogService } from "./dailyLog.service";
import AppError from "../../errors/AppError";
import { aiClient } from "../../../helpers/aiClient";
import { endOfDay, startOfDay } from "../../../helpers/timeHelper";
import { User } from "../user/user.model";

// Create a daily log
const createDailyLog = catchAsync(async (req: Request, res: Response) => {
  // console.log("req.body", req.body);

  const result = await DailyLogService.createDailyLog(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Daily log added successfully",
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

// chat about daily log
const chat=  catchAsync(async(req: Request, res: Response) => {
  const { userId } = req.body;
  const { message } = req.body;
  const result = await aiClient.chat({
    userId,
    message,
  })
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Daily log retrieved successfully",
    data: result.data,
  });
}
);
// const  with daily log
const insights=  catchAsync(async(req: Request, res: Response) => {
  const { userId ,startDate,endDate} = req.body;
  const result = await aiClient.insights({
    userId,
    categories: ["visualization","Wellness","Recovery","Lifting","Consistency"],
    startDate: startOfDay(startDate).toISOString(),
    endDate: endOfDay(endDate).toISOString(),
  })
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "insights retrieved successfully",
    data: result.data,
  });
}
);
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

//export_csv
 const  exportCsv = catchAsync(async (req: Request, res: Response) => {
  const { userId ,startDate,endDate} = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User not found"
    );
  }
  
  const result = await aiClient.exportCsv({
    userId,
    startDate: startOfDay(startDate).toISOString(),
    endDate: endOfDay(endDate).toISOString(),
  })
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "insights retrieved successfully",
    data: result.data,
  });
}
);

export const DailyLogController = {
  createDailyLog,
  getDailyLogsByUser,
  getDailyLogById,
  getDailyLogByUserAndDate,
  updateDailyLog,
  deleteDailyLog,
  chat,
  insights,
  exportCsv
};