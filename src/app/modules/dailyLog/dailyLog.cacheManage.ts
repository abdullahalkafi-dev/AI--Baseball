// dailyLog.cacheManage.ts
import cacheService from "../../../util/cacheService";
import { normalizeQuery } from "../../../util/normalizeQuery";
import { TDailyLog } from "./dailyLog.interface";

const DEFAULT_TTL = 60 * 60 * 12; // 12 hours

const DailyLogCacheManage = {
  keys: {
    dailyLogList: "dailyLogList",
    dailyLogListWithQuery: "dailyLogListWithQuery",
    dailyLogId: (id: string) => `dailyLog:${id}`,
    dailyLogByUser: (userId: string) => `dailyLog:user:${userId}`,
    dailyLogByUserAndDate: (userId: string, date: string) => `dailyLog:user:${userId}:date:${date}`,
    dailyLogListWithQueryKey: (query: Record<string, unknown>) => {
      const normalized = normalizeQuery(query);
      return `${DailyLogCacheManage.keys.dailyLogListWithQuery}:${JSON.stringify(
        normalized
      )}`;
    },
  },
  
  updateDailyLogCache: async (dailyLogId: string) => {
    // Remove the specific dailyLog cache
    await cacheService.deleteCache(DailyLogCacheManage.keys.dailyLogId(dailyLogId));

    // Remove the general dailyLog list cache
    await cacheService.deleteCache(DailyLogCacheManage.keys.dailyLogList);

    // Invalidate all query-based caches using pattern deletion
    await cacheService.deleteCacheByPattern(
      DailyLogCacheManage.keys.dailyLogListWithQuery + ":*"
    );
  },

  updateDailyLogByUserCache: async (userId: string) => {
    // Remove the user-specific dailyLog cache
    await cacheService.deleteCache(DailyLogCacheManage.keys.dailyLogByUser(userId));
    
    // Invalidate all date-specific caches for this user
    await cacheService.deleteCacheByPattern(
      `${DailyLogCacheManage.keys.dailyLogByUser(userId)}:date:*`
    );
    
    // Also update general caches
    await cacheService.deleteCache(DailyLogCacheManage.keys.dailyLogList);
    await cacheService.deleteCacheByPattern(
      DailyLogCacheManage.keys.dailyLogListWithQuery + ":*"
    );
  },

  getCacheSingleDailyLog: async (dailyLogId: string): Promise<TDailyLog | null> => {
    const key = DailyLogCacheManage.keys.dailyLogId(dailyLogId);
    const cached = await cacheService.getCache<TDailyLog>(key);
    return cached ?? null;
  },

  setCacheSingleDailyLog: async (dailyLogId: string, data: TDailyLog) => {
    const key = DailyLogCacheManage.keys.dailyLogId(dailyLogId);
    await cacheService.setCache(key, data, DEFAULT_TTL);
  },

  getCacheDailyLogByUserAndDate: async (userId: string, date: Date | string): Promise<TDailyLog | null> => {
    const formattedDate = typeof date === 'string' ? date : date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const key = DailyLogCacheManage.keys.dailyLogByUserAndDate(userId, formattedDate);
    const cached = await cacheService.getCache<TDailyLog>(key);
    return cached ?? null;
  },

  setCacheDailyLogByUserAndDate: async (userId: string, date: Date | string, data: TDailyLog) => {
    const formattedDate = typeof date === 'string' ? date : date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const key = DailyLogCacheManage.keys.dailyLogByUserAndDate(userId, formattedDate);
    await cacheService.setCache(key, data, DEFAULT_TTL);
  },

  setCacheListWithQuery: async (
    query: Record<string, unknown>,
    data: { result: TDailyLog[]; meta?: any },
    ttl: number = DEFAULT_TTL
  ) => {
    const key = DailyLogCacheManage.keys.dailyLogListWithQueryKey(query);
    await cacheService.setCache(key, data, ttl);
  },

  getCacheListWithQuery: async (
    query: Record<string, unknown>
  ): Promise<{ result: TDailyLog[]; meta?: any } | null> => {
    const key = DailyLogCacheManage.keys.dailyLogListWithQueryKey(query);
    const cached = await cacheService.getCache<{ result: TDailyLog[]; meta?: any }>(
      key
    );
    return cached ?? null;
  },
};

export default DailyLogCacheManage;