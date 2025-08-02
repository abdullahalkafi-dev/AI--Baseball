// backend/services/aiClient.ts
import axios, { AxiosResponse } from "axios";
import { TDailyLog } from "../app/modules/dailyLog/dailyLog.interface";
import config from "../config";

const AI_URL = config.ai.ai_url || "http://localhost:8000";
console.log(AI_URL, "AI_URL");

export const aiClient = {
  embed: (log: TDailyLog): Promise<AxiosResponse> => {
    return axios.post(`${AI_URL}/embed`, log, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 25000, // 25 seconds
    });
  },
  chat: async (data: {
    userId: string;
    message: string;
  }): Promise<AxiosResponse<{ reply: string,tag:string }>> => {
    console.log(`${AI_URL}/chat`, "AI_URL");
    const res = await axios.post(`${AI_URL}/chat`, data, {
      timeout: 25000, // 25 seconds
    });
    console.log(res.data, "response");
    return res;
  },
  insights: async (data: {
    userId: string;
    categories: string[];
    startDate: string;
    endDate: string;
  }): Promise<AxiosResponse<any>> => {
    console.log(JSON.stringify(data), "data");
    const response = await axios.post(`${AI_URL}/insights`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 25000, // 25 seconds
    });
    console.log(response.data, "response");
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
        console.log(response.data, "response");
      })
      .catch((error: any) => {
        console.error("Error fetching export_csv:", error);
        throw error;
      });
    return result;
  },
  // },  exportCsv: async (data: {
  //   userId: string;
  //   startDate: string;
  //   endDate: string;
  // }): Promise<AxiosResponse<Blob>> => {
  //   console.log(data, "data");
  //   const res = await axios.post(`${AI_URL}/export_csv`, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log(res.data, "response");
  //   return res;
  // },
};
