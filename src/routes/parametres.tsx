import { createFileRoute, useNavigate } from "@tanstack/react-router";
import PageTitle from "../components/Layout/PageTitle.tsx";
import ParametreNumerique from "../components/Parametres/ParametreNumerique.tsx";
import PlayersTable from "../components/Table/PlayersTable.tsx";
import ParametreString from "../components/Parametres/ParametreString.tsx";
import { createPlayer } from "../queries/postQueries.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ParametreBooleen from "../components/Parametres/ParametreBooleen.tsx";
import StartButton from "../components/Form/StartButton.tsx";
import {
  updateAttente,
  updateDureeMatch,
  updateNbTerrains,
} from "../queries/patchQueries.tsx";
import { tournoiId } from "../constants.ts";

export const Route = createFileRoute("/parametres")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addPlayer } = useMutation({
    mutationFn: (inputValue: string) => createPlayer(inputValue, tournoiId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players", tournoiId] });
    },
  });

  const { mutate: changeNbTerrains } = useMutation({
    mutationFn: (value: number) => updateNbTerrains(tournoiId, value),
  });

  const { mutate: changeDureeMatch } = useMutation({
    mutationFn: (value: number) => updateDureeMatch(tournoiId, value),
  });

  const { mutate: changePrioriserAttente } = useMutation({
    mutationFn: (value: boolean) => updateAttente(tournoiId, value),
  });

  return (
    <>
      <div className={"grid grid-cols-2"}>
        <div>
          <PageTitle title={"Paramètres du tournoi"} />
          <ParametreNumerique
            description="Nombre de terrains disponibles"
            defaut={7}
            onValueChange={(value: number) => changeNbTerrains(value)}
          />

          <div className={"mt-5"}>
            <ParametreString
              description={"Ajouter un.e participant.e"}
              placeholder={"Entrez un nom"}
              onPress={(inputValue: string) => addPlayer(inputValue)}
            />
          </div>

          <ParametreNumerique
            description={"Durée d'un match"}
            defaut={8}
            onValueChange={(value: number) => changeDureeMatch(value)}
            unit={"minute"}
          />

          <div className={"mt-7"}>
            <ParametreBooleen
              description={"Prioriser le moins d'attente"}
              defaut={true}
              onValueChange={(value: boolean) => changePrioriserAttente(value)}
            />
          </div>

          <div className={"mt-40"}>
            <StartButton
              description={"Lancer le tournoi"}
              onPress={async function () {
                await navigate({
                  to: "/round",
                });
              }}
            />
          </div>
        </div>
        <div>
          <PlayersTable tournoiId={tournoiId} />
        </div>
      </div>
    </>
  );
}
