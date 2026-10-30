import api from "./axiosConfig.ts";

export async function getPlayersByTournoi(tournoiId: string) {
  const response = await api.get(`/tournoi/joueureuses`, {
    params: { id: tournoiId },
  });
  return response.data;
}

export async function selectPlayers(tournoiId: string) {
  const response = await api.get(`/round/paires?tournoiId=${tournoiId}`);
  return response.data;
}
