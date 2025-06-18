import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DailyLogService } from "./dailyLog.service";
import AppError from "../../errors/AppError";
import { aiClient } from "../../../helpers/aiClient";
import { endOfDay, startOfDay } from "../../../helpers/timeHelper";
import { User } from "../user/user.model";
import fs from "fs";
import path from "path";
import config from "../../../config";

// Create a daily log
const createDailyLog = catchAsync(async (req: Request, res: Response) => {
  console.log("req.body", req.body);
 
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
  
  if(result.data.tag && result.data.tag === "csv_download") {
    // Generate filename with userId-dd-mm-yyyy-random6digit format
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const filename = `${userId}-${day}-${month}-${year}-${randomCode}.csv`;
    
    // Create CSV file path
    const csvDir = path.join(process.cwd(), 'uploads', 'csv');
    const filePath = path.join(csvDir, filename);
    
    // Ensure CSV directory exists
    if (!fs.existsSync(csvDir)) {
      fs.mkdirSync(csvDir, { recursive: true });
    }
    
    // Write CSV content to file
    fs.writeFileSync(filePath, result.data.reply);
    
    // Generate URL
    const baseUrl = `https://9a19-115-127-156-9.ngrok-free.app`;
    // const baseUrl = `http://localhost:${config.port || 5005}`;
    const fileUrl = `${baseUrl}/csv/${filename}`;
    
    // Update result data reply with the URL
    result.data.reply = fileUrl;
  }
  
  console.log(result);
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
//  const  exportCsv = catchAsync(async (req: Request, res: Response) => {
//   const { userId ,startDate,endDate} = req.body;
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError(
//       StatusCodes.NOT_FOUND,
//       "User not found"
//     );
//   }
  
//   const result = await aiClient.exportCsv({
//     userId,
//     startDate: startOfDay(startDate).toISOString(),
//     endDate: endOfDay(endDate).toISOString(),
//   })
//   console.log(result);
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: "insights retrieved successfully",
//     data: result.data,
//   });
// }
// );
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
  console.log(result);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "insights retrieved successfully",
    data: result,
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