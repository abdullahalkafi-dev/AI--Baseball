import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const usersRes = await UserServices.getAllUsers(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    data: usersRes.result,
    meta: usersRes.meta,
  });
});
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const data = JSON.parse(req.body.data);
  const files: any = req.files;
  console.log(files);
  if (files?.image && files?.image.length > 0) {
    const file = files.image[0];
    data.image = file.path;
  }
  const user = await UserServices.updateUser(req?.params?.id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data: user,
  });
});
const updateUserByToken = catchAsync(async (req: Request, res: Response) => {
  const id = req.user.id;
  console.log(id);
  const data = JSON.parse(req.body.data);

  const files: any = req.files;
  console.log(files);
  if (files?.image && files?.image.length > 0) {
    const file = files.image[0];
    data.image = file.path;
  }

  const user = await UserServices.updateUser(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

const updateUserActivationStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { status } = req.body;
    const user = await UserServices.updateUserActivationStatus(
      req.params.id,
      status
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: `User ${
        status === "active" ? "activated" : "deleted"
      } successfully`,
      data: user,
    });
  }
);
const getMe = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user, "get me user"
  );
  const user = await UserServices.getUserById(req.user.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { role } = req.body;
  const user = await UserServices.updateUserRole(req.params.id, role);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User role updated successfully",
    data: user,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserActivationStatus,
  updateUserRole,
  updateUserByToken,
  getMe,
};
