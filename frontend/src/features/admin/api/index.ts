import { API_URL, BASE_OPTIONS, responseInterceptor } from "@/shared/model";

export const AdminService = {
  login: async (body: { email: string; password: string }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      credential: "include",
      ...BASE_OPTIONS,
    };

    return responseInterceptor(`${API_URL}/auth/login`, options);
  },
};
