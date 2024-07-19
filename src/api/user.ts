import { useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "../context";

export const useUser = () => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["user-me"],
    queryFn: () => axios.get("/user").then((res) => res.data.data),
  });
};
