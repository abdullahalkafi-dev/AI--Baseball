import { Router } from "express";
import { SettingController } from "./setting.controller";

const route:Router =Router();

route.get("/privacy", SettingController.getPrivacyPage);
export const SettingRoutes = route;