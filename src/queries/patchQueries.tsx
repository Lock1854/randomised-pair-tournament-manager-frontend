import api from "./axiosConfig.ts";

export async function updateDureeMatch(
  id: string,
  dureeMatch: number,
): Promise<void> {
  const response = await api.patch(
    `tournoi/duree-match?id=${id}&dureeMatch=${dureeMatch}`,
  );
  return response.data;
}

export async function updateNbTerrains(
  id: string,
  nbTerrains: number,
): Promise<void> {
  const response = await api.patch(
    `tournoi/nb-terrains?id=${id}&nbTerrains=${nbTerrains}`,
  );
  return response.data;
}

export async function updateAttente(
  id: string,
  prioriserAttente: boolean,
): Promise<void> {
  const response = await api.patch(
    `tournoi/attente?id=${id}&attente=${prioriserAttente}`,
  );
  return response.data;
}

export async function applyVictoire(id: string): Promise<void> {
  const response = await api.patch(
    `joueureuse/resultats-match?id=${id}&resultatMatch=gagne`,
  );
  return response.data;
}
