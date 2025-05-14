// backend/services/aiClient.ts
import axios, { AxiosResponse } from 'axios';
import { TDailyLog } from '../app/modules/dailyLog/dailyLog.interface';
import config from '../config';

const AI_URL = config.ai.ai_url || 'http://localhost:8000';
console.log(AI_URL, 'AI_URL');



export 
const aiClient = {
  embed: (log: TDailyLog): Promise<AxiosResponse> =>{
    console.log(log);
    return axios.post(`${AI_URL}/embed`, log);
  }
,
  chat: (data: { userId: string; message: string }): Promise<AxiosResponse<{ reply: string }>> =>
    axios.post(`${AI_URL}/chat`, data),

  insights: async (data: { userId: string; categories: string[]; startDate: string; endDate: string }): Promise<AxiosResponse<any>> => {
    console.log(  JSON.stringify(data),"data");
    const response = await axios.post(`${AI_URL}/insights`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data, "response");
    return response;
  },
  

  exportCsv: (data: { userId: string; categories: string[]; start: string; end: string }): Promise<AxiosResponse<Blob>> =>
    axios.post(`${AI_URL}/export_csv`, data, { responseType: 'blob' },),
};
