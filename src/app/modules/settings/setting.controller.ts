import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SettingServices } from "./setting.service";

const getPrivacyPage = catchAsync(async (req, res) => {
  const privacyPage = await SettingServices.getPrivacyPage();
 sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Privacy page fetched successfully",
    data: privacyPage,
  });

});


export  const SettingController = {
  getPrivacyPage,
};