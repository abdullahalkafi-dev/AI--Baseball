import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  levelOfSport: "School" | "College" | "Professional" | "Other";
  playerType: "Pitcher" | "Position Player";
  HowOftenDoYouJournal: "Never tried it" | "Dabbled a little" | "Pretty consistent"
  ThreeWordThtDescribeYou: string
  role: "ADMIN" | "USER";
  birthDate: Date;
  image?: string;
  phoneNumber?: string;
  status: "active" | "delete";
  verified?: boolean;
  fcmToken?: string;
  address: string;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: string;
    expireAt: Date;
  };
  passwordChangedAt?: Date;
};
export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isExistUserByPhnNum(phnNum: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
} & Model<TUser>;

export namespace TReturnUser {
  export type Meta = {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
  };

  export type getAllUser = {
    result: TUser[];
    meta?: Meta;
  };

  export type getSingleUser = TUser
  export type updateUser = TUser
  export type updateUserActivationStatus = TUser

  export type updateUserRole =TUser

  export type deleteUser =TUser
}
