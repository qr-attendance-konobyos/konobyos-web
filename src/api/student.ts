import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "../context";
import { mapAxiosResponse } from "./utils";

export const useGetStudentsQuery = ({
  size,
  search,
  page,
}: {
  size: number;
  page: number;
  search?: string;
}) => {
  const client = useAxiosInstance();
  return useQuery({
    queryKey: ["get_students", size, page, search],
    queryFn: () =>
      mapAxiosResponse<StudentModel[]>(
        client.get("/students", {
          params: {
            skip: page * size,
            take: size,
            search,
          },
        })
      ),
  });
};

export const useCreateStudentMutation = () => {
  const client = useAxiosInstance();

  return useMutation({
    mutationFn: (payload: Omit<StudentModel, "id">) =>
      mapAxiosResponse(client.post("/students", payload)),
  });
};

export const useUpdateStudentMutation = (studentId: string) => {
  const client = useAxiosInstance();

  return useMutation({
    mutationFn: (payload: Partial<StudentModel>) =>
      mapAxiosResponse(client.put(`/students/${studentId}`, payload)),
  });
};

export const useDeleteStudentMutation = (studentId: string) => {
  const client = useAxiosInstance();

  return useMutation({
    mutationFn: () => mapAxiosResponse(client.delete(`/students/${studentId}`)),
  });
};

export const useStudentQuery = (studentId: string) => {
  const client = useAxiosInstance();

  return useQuery({
    queryKey: ["student", studentId],
    queryFn: () =>
      mapAxiosResponse<StudentModel>(client.get(`/students/${studentId}`)),
  });
};

export type StudentModel = {
  id: string;
  name: string;
  christianName: string;
  email: string;
  phoneNumber: string;
};
