export type TNotification = {
  userId: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TCreateNotification = {
  userId: string;
  message: string;
};

export type TUpdateNotification = {
  message?: string;
  isRead?: boolean;
};

export namespace TReturnNotification {
  export type getSingleNotification = TNotification;
  export type getAllNotification = {
    result: TNotification[];
    meta: {
      page: number;
      limit: number;
      totalPage: number;
      total: number;
    };
  };
  export type updateNotification = TNotification;
  export type createNotification = TNotification;
}
