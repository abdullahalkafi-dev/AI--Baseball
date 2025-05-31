import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { DailyLog } from "./dailylog.model";
import { TDailyLog } from "./dailyLog.interface";
import { startOfDay, endOfDay } from "../../../helpers/timeHelper";
import { StatusCodes } from "http-status-codes";
import DailyLogCacheManage from "./dailyLog.cacheManage";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { aiClient } from "../../../helpers/aiClient";

// Create daily log
const createDailyLog = async (payload: TDailyLog): Promise<TDailyLog> => {
  const userId = new Types.ObjectId(payload.userId as unknown as string);
  console.log(userId, "User Id");
  //  console.log(payload,"Payload Date");
  // Check if log already exists for this user on this date
  const dateStart = startOfDay(payload.date);
  const dateEnd = endOfDay(payload.date);

  const existingLog = await DailyLog.findOne({
    userId,
    date: {
      $gte: dateStart,
      $lte: dateEnd,
    },
  });
  if (existingLog) {
    const result = await updateDailyLog(existingLog._id.toString(), payload);
    // console.log(result);

    //! If you want to embed the updated log with AI, uncomment below
    try {
   await aiClient.embed(result);
     //update cache
      await DailyLogCacheManage.updateDailyLogCache(
        existingLog._id.toString()
      );
      await DailyLogCacheManage.updateDailyLogByUserCache(
        userId.toString()
      );
    } catch (e) {
      console.log(e);
    }

    return result;
  }
  console.log(payload);
  // Create new daily log
  const result = await DailyLog.create(payload);

  // Invalidate user's cache
  await DailyLogCacheManage.updateDailyLogByUserCache(userId.toString());

  await DailyLogCacheManage.setCacheDailyLogByUserAndDate(
    userId.toString(),
    payload.date,
    result
  );
  await aiClient.embed(result);

  return result;
};

// Get daily logs for user
const getDailyLogsByUser = async (
  userId: string,
  query: Record<string, unknown>
): Promise<{ result: TDailyLog[]; meta?: any }> => {
  // Try to get from cache first
  const cached = await DailyLogCacheManage.getCacheListWithQuery({
    userId,
    ...query,
  });

  if (cached) return cached;

  const { startDate, endDate, ...filters } = query;
  const userObjectId = new Types.ObjectId(userId);

  // Base query condition
  const queryOptions: any = { userId: userObjectId };

  // Add date range filter if provided
  if (startDate || endDate) {
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.$gte = startOfDay(new Date(startDate as string));
    }
    if (endDate) {
      dateFilter.$lte = endOfDay(new Date(endDate as string));
    }
    queryOptions.date = dateFilter;
  }

  // Use QueryBuilder for better filtering, pagination, sorting
  const dailyLogQuery = new QueryBuilder(DailyLog.find(queryOptions), filters)
    .search([])
    .filter()
    .sort("date")
    .paginate()
    .fields();

  const result = await dailyLogQuery.modelQuery;
  const meta = await dailyLogQuery.countTotal();

  // Cache the results
  await DailyLogCacheManage.setCacheListWithQuery(
    { userId, ...query },
    { result, meta }
  );

  return { result, meta };
};

// Get single daily log by ID
const getDailyLogById = async (id: string): Promise<TDailyLog> => {
  // Try to get from cache first
  const cachedDailyLog = await DailyLogCacheManage.getCacheSingleDailyLog(id);
  if (cachedDailyLog) return cachedDailyLog;

  // If not cached, query the database
  const dailyLog = await DailyLog.findById(id);

  if (!dailyLog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Daily log not found");
  }

  // Cache the freshly retrieved data
  await DailyLogCacheManage.setCacheSingleDailyLog(id, dailyLog);

  return dailyLog;
};

// Get daily log by user and date
const getDailyLogByUserAndDate = async (
  userId: string,
  date: Date
): Promise<TDailyLog> => {
  // Try to get from cache first
  const cachedDailyLog =
    await DailyLogCacheManage.getCacheDailyLogByUserAndDate(userId, date);
  if (cachedDailyLog) return cachedDailyLog;

  const userObjectId = new Types.ObjectId(userId);
  const dateStart = startOfDay(date);
  const dateEnd = endOfDay(date);

  const dailyLog = await DailyLog.findOne({
    userId: userObjectId,
    date: {
      $gte: dateStart,
      $lte: dateEnd,
    },
  });

  if (!dailyLog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No daily log found for this user on this date"
    );
  }

  // Cache the result
  await DailyLogCacheManage.setCacheDailyLogByUserAndDate(
    userId,
    date,
    dailyLog
  );
  await DailyLogCacheManage.setCacheSingleDailyLog(
    dailyLog._id.toString(),
    dailyLog
  );

  return dailyLog;
};

// Update daily log
const updateDailyLog = async (
  id: string,
  payload: Partial<TDailyLog>
): Promise<TDailyLog> => {
  // Check if log exists
  const dailyLog = await DailyLog.findById(id);

  if (!dailyLog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Daily log not found");
  }

  // Don't allow updating userId or date
  if (payload.userId) delete payload.userId;
  if (payload.date) delete payload.date;

  const result = await DailyLog.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Failed to update daily log");
  }

  // Invalidate caches
  await DailyLogCacheManage.updateDailyLogCache(id);
  await DailyLogCacheManage.updateDailyLogByUserCache(
    dailyLog.userId.toString()
  );

  // Set new cache
  await DailyLogCacheManage.setCacheSingleDailyLog(id, result);
  await DailyLogCacheManage.setCacheDailyLogByUserAndDate(
    dailyLog.userId.toString(),
    dailyLog.date,
    result
  );

  return result;
};

// Delete daily log
const deleteDailyLog = async (id: string): Promise<TDailyLog> => {
  const dailyLog = await DailyLog.findById(id);

  if (!dailyLog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Daily log not found");
  }

  const result = await DailyLog.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Daily log not found");
  }

  // Invalidate caches
  await DailyLogCacheManage.updateDailyLogCache(id);
  await DailyLogCacheManage.updateDailyLogByUserCache(
    dailyLog.userId.toString()
  );

  return result;
};

export const DailyLogService = {
  createDailyLog,
  getDailyLogsByUser,
  getDailyLogById,
  getDailyLogByUserAndDate,
  updateDailyLog,
  deleteDailyLog,
};
