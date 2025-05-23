import express, { Router } from "express";
import { UserRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { DailyLogRoutes } from "../app/modules/dailyLog/dailyLog.route";
import { NutritionRoutes } from "../app/modules/nutrition/nutrition.route";

const router: Router = express.Router();

const apiRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/daily-logs",
    route: DailyLogRoutes,
  },
  {
    path: "/nutrition",
    route: NutritionRoutes,
  },
];
apiRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
