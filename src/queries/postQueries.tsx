import api from "./axiosConfig.ts";

export async function createPlayer(
  nom: string,
  tournoiId: string,
): Promise<void> {
  await api.post(`joueureuse`, {
    nom,
    tournoiId,
  });
}
