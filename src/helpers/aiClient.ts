// backend/services/aiClient.ts
import axios, { AxiosResponse } from "axios";
import { TDailyLog } from "../app/modules/dailyLog/dailyLog.interface";
import config from "../config";

const AI_URL = config.ai.ai_url || "http://localhost:8000";

export const aiClient = {
  embed: (log: TDailyLog): Promise<AxiosResponse> => {
    return axios.post(`${AI_URL}/embed`, log, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 25000, // 25 seconds
    });
  },
  chat
  : async (data: {
    userId: string;
    message: string;
  }): Promise<AxiosResponse<{ reply: string,tag:string }>> => {
    const res = await axios.post(`${AI_URL}/chat`, data, {
      timeout: 25000, // 25 seconds
    });
    return res;
  },
  insights: async (data: {
    userId: string;
    categories: string[];
    startDate: string;
    endDate: string;
  }): Promise<AxiosResponse<any>> => {
    const response = await axios.post(`${AI_URL}/insights`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 25000, // 25 seconds
    });
    return response;
  },

  exportCsv: async (data: {
    userId: string;
    startDate: string;
    endDate: string;
  }) => {
    const result = axios
      .get(`${AI_URL}/export_csv`, {
        timeout: 25000, // 25 seconds
      })
      .then((response: any) => {
      })
      .catch((error: any) => {
        console.error("Error fetching export_csv:", error);
        throw error;
      });
    return result;
  },

};
