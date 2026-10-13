import api from "./axiosConfig.ts";

export async function getPlayersByTournoi(tournoiId: string) {
  const response = await api.get(`/tournoi/joueureuses`, {
    params: { id: tournoiId },
  });
  return response.data;
}
