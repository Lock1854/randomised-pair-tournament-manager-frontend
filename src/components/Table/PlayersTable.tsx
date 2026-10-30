import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayersByTournoi } from "../../queries/getQueries.tsx";
import Loading from "../Feedback/Loading.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";
import { mapPlayerRows } from "../../usefulFunctions/getRows.tsx";
import { IoTrashBinOutline } from "react-icons/io5";
import { deletePlayer } from "../../queries/deleteQueries.tsx";
import PageSubtitle from "../Layout/PageSubtitle.tsx";

type PlayersTableProps = {
  tournoiId: string;
};

const PlayersTable = ({ tournoiId }: PlayersTableProps) => {
  const queryClient = useQueryClient();

  const playersQuery = useQuery({
    queryKey: ["players", tournoiId],
    queryFn: () => getPlayersByTournoi(tournoiId),
    retryDelay: 1000,
  });

  const { mutate: removePlayer } = useMutation({
    mutationFn: (inputValue: string) => deletePlayer(inputValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players", tournoiId] });
    },
  });

  const rows = playersQuery.isSuccess ? mapPlayerRows(playersQuery.data) : [];
  console.log(rows);

  return (
    <>
      <PageSubtitle title={`${rows.length} participant.e.s`} />
      {playersQuery.isError && (
        <ErrorMessage error={playersQuery.error.message} />
      )}
      {playersQuery.isLoading && <Loading />}
      {playersQuery.isSuccess && (
        <Table className={"mr-10"} isVirtualized>
          <TableHeader>
            <TableColumn key={"nom"} className={"text-medium"}>
              {"Nom"}
            </TableColumn>
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.joueureuseId}>
                <TableCell>
                  <span className={"text-medium"}>{item.nom}</span>
                  <Button
                    isIconOnly
                    className={"m-2 float-right"}
                    size={"sm"}
                    onPress={() => removePlayer(item.joueureuseId)}
                  >
                    <IoTrashBinOutline />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default PlayersTable;
