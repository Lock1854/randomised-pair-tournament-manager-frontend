import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "../components/Layout/PageTitle.tsx";
import { useQuery } from "@tanstack/react-query";
import { selectPlayers } from "../queries/getQueries.tsx";
import { tournoiId } from "../constants.ts";
import ErrorMessage from "../components/Feedback/ErrorMessage.tsx";
import Loading from "../components/Feedback/Loading.tsx";
import RoundCourts, { type Pair } from "../components/Round/RoundCourts.tsx";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import type { CourtTableHandle } from "../components/Table/CourtTable.tsx";

export const Route = createFileRoute("/round")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedPlayers, setSelectedPlayers] = useState<Pair[]>();
  const [hasUnselectedChange, setHasUnselectedChange] = useState(true);

  const courtsRef = useRef<CourtTableHandle>(null);

  const roundPlayersQuery = useQuery({
    queryKey: ["select-players", tournoiId],
    queryFn: () => selectPlayers(tournoiId),
    retryDelay: 1000,
  });

  function updateSelectedPlayersAndReset() {
    setSelectedPlayers(roundPlayersQuery.data);
    roundPlayersQuery.refetch();
  }

  useEffect(() => {
    if (roundPlayersQuery.isSuccess && selectedPlayers === undefined) {
      updateSelectedPlayersAndReset();
    }
  }, [roundPlayersQuery.isSuccess, selectedPlayers]);

  const startNewRound = async () => {
    await courtsRef.current?.applyResults();
    updateSelectedPlayersAndReset();
  };

  return (
    <>
      <PageTitle title={"Round"} />
      {roundPlayersQuery.isError && (
        <ErrorMessage error={roundPlayersQuery.error.message} />
      )}
      {roundPlayersQuery.isLoading && <Loading />}
      {roundPlayersQuery.isSuccess && (
        <Modal size={"5xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Prochain round
                </ModalHeader>
                <ModalBody>
                  <RoundCourts pairs={roundPlayersQuery.data} readonly={true} />
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Fermer</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      <RoundCourts
        pairs={selectedPlayers ?? []}
        readonly={false}
        onHasUnselectedChange={setHasUnselectedChange}
        ref={courtsRef}
      />
      <div className="mt-5">
        <Button onPress={onOpen}>Voir prochain round</Button>
      </div>
      <div className="mt-15">
        <Button isDisabled={hasUnselectedChange} onPress={startNewRound}>
          Lancer un nouveau round
        </Button>
      </div>
    </>
  );
}
