import { useMutation } from "@tanstack/react-query";
import { useAuth, useAxiosInstance } from "../context";

export const useLogin = () => {
  const client = useAxiosInstance();
  const auth = useAuth();
  return useMutation({
    mutationFn: async (data: { phoneNumber: string; pin: string }) =>
      client
        .post("/auth/login", data)
        .then((res) => res.data)
        .then(async (data) => {
          auth.login(data.token);
        }),
  });
};
