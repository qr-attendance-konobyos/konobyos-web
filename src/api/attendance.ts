import { useMutation } from "@tanstack/react-query";
import { useAxiosInstance } from "../context";
import { mapAxiosResponse } from "./utils";

export const useCreateAttendanceMutation = () => {
  const client = useAxiosInstance();

  return useMutation({
    mutationFn: ({
      studentId,
      type,
    }: {
      studentId: string;
      type: AttendanceTypes;
    }) => mapAxiosResponse(client.post(`/attendance/${studentId}`, { type })),
  });
};

export type AttendanceTypes = "PRESENT" | "ABSENT" | "LATE";
