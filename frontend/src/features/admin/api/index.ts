import { API_URL, BASE_OPTIONS, responseInterceptor } from "@/shared/model";

export const AdminService = {
  login: async (body: { email: string; password: string }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      ...BASE_OPTIONS,
    };

    return responseInterceptor(`${API_URL}/auth/login`, options);
  },

  me: async (token?: string) => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        ...BASE_OPTIONS.headers,
        Cookie: `access_token=${token}`,
      },
      credentials: "include",
    };

    return responseInterceptor(`${API_URL}/auth/me`, options);
  },
};
