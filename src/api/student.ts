import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "../context";

export const useGetStudentsQuery = ({
  size,
  search,
  page,
}: {
  size?: number;
  page?: number;
  search?: string;
}) => {
  const client = useAxiosInstance();
  return useQuery({
    queryKey: ["get_students", size, page, search],
    queryFn: () =>
      client.get("/students", {
        params: {
          skip: page,
          take: size,
          search,
        },
      }),
  });
};

export const useCreateStudentMutation = () => {
  const client = useAxiosInstance();

  return useMutation({
    mutationFn: (payload: StudentModel) =>
      client.post("/students", payload).then((data) => data.data.data),
  });
};

export const useUpdateStudentMutation = (studentId: string) => {
  const client = useAxiosInstance();

  return useMutation({
    mutationFn: (payload: Partial<StudentModel>) =>
      client.put(`/students/${studentId}`, payload).then((data) => data.data),
  });
};

type StudentModel = {
  name: string;
  christianName: string;
  email: string;
  phoneNumber: string;
};
