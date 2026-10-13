import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "../components/Layout/PageTitle.tsx";
import ParametreNumerique from "../components/Parametres/ParametreNumerique.tsx";
import PlayersTable from "../components/Table/PlayersTable.tsx";
import ParametreString from "../components/Parametres/ParametreString.tsx";
import { createPlayer } from "../queries/postQueries.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ParametreBooleen from "../components/Parametres/ParametreBooleen.tsx";

export const Route = createFileRoute("/parametres")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const tournoiId = "7028e99f-5fd2-4f88-a542-d5c64d49d878";

  const { mutate: addPlayer } = useMutation({
    mutationFn: (inputValue: string) => createPlayer(inputValue, tournoiId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players", tournoiId] });
    },
  });

  return (
    <>
      <div className={"grid grid-cols-2"}>
        <div>
          <PageTitle title={"Paramètres du tournoi"} />
          <div className={"mb-10"}>
            <ParametreNumerique
              description="Nombre de terrains disponibles"
              defaut={7}
            />
          </div>

          <ParametreString
            description={"Ajouter un.e participant.e"}
            placeholder={"Entrez un nom"}
            onPress={(inputValue: string) => addPlayer(inputValue)}
          />

          <ParametreNumerique
            description={"Durée d'un match"}
            defaut={8}
            unit={"minute"}
          />

          <ParametreBooleen
            description={"Prioriser le moins d'attente"}
            defaut={true}
          />
        </div>
        <div>
          <PlayersTable tournoiId={tournoiId} />
        </div>
      </div>
    </>
  );
}
