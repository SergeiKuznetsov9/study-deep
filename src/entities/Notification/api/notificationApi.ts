import { rtkApi } from "@/shared/api/rtkApi";

import { Notification } from "../model/types/notification";

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getnotifications: build.query<Notification[], string>({
      query: (id: string) => ({
        url: `/notifications/${id}`,
      }),
    }),
  }),
});

export const useNotifications = notificationApi.useGetnotificationsQuery;
