import api from "./axiosConfig.ts";

export async function deletePlayer(id: string): Promise<void> {
  const response = await api.delete(`joueureuse?id=${id}`);
  return response.data;
}
