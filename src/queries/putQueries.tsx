import api from "./axiosConfig.ts";
import type { TimeWorked } from "./type.ts";

export async function updateActivityTimeWorked(
  id: string,
  timeWorked: TimeWorked,
): Promise<void> {
  const response = await api.put(`activity/timeWorked/${id}`, { timeWorked });
  return response.data;
}
