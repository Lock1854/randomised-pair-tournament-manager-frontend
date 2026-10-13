import type { Player } from "../queries/type.ts";

type PlayerRow = {
  joueureuseId: string;
  nom: string;
};

export function mapPlayerRows(playersQueryResult: Player[]): PlayerRow[] {
  return playersQueryResult.map((player: Player) => {
    return {
      joueureuseId: player.joueureuseId,
      nom: player.nom,
    };
  });
}
