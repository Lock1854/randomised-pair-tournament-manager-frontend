import {
  Select,
  SelectItem,
  type SharedSelection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import PageSubtitle from "../Layout/PageSubtitle.tsx";
import type { Player } from "../../queries/type.ts";
import { type Ref, useImperativeHandle, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { applyVictoire } from "../../queries/patchQueries.tsx";

export type CourtTableHandle = {
  applyResults: () => Promise<void>;
};

type CourtTableProps = {
  courtNumber: number;
  pair1: [Player, Player];
  pair2: [Player, Player];
  readonly: boolean;
  onWinnersChange: (winners: Set<string>) => void;
  ref?: Ref<CourtTableHandle>;
};

const CourtTable = ({
  courtNumber,
  pair1,
  pair2,
  readonly,
  onWinnersChange,
  ref,
}: CourtTableProps) => {
  const [winners, setWinners] = useState<Set<string>>(new Set<string>());

  const handleSelectionChange = (keys: SharedSelection) => {
    const next =
      keys === "all"
        ? new Set(["pair1", "pair2"])
        : new Set(Array.from(keys, String));
    setWinners(next);
    onWinnersChange(next);
  };

  const { mutateAsync: enregistrerVictoire } = useMutation({
    mutationKey: ["apply-victoire"],
    mutationFn: (playerId: string) => applyVictoire(playerId),
  });

  useImperativeHandle(ref, () => ({
    async applyResults() {
      if (winners.has("pair1")) {
        await enregistrerVictoire(pair1[0].joueureuseId);
        await enregistrerVictoire(pair1[1].joueureuseId);
      }
      if (winners.has("pair2")) {
        await enregistrerVictoire(pair2[0].joueureuseId);
        await enregistrerVictoire(pair2[1].joueureuseId);
      }
      setWinners(new Set());
    },
  }));

  return (
    <>
      <div className="grid grid-cols-1">
        <PageSubtitle title={`Terrain ${courtNumber}`} />
        <Table className={"mr-10"}>
          <TableHeader>
            <TableColumn
              key={"paire1"}
              className={`text-medium ${winners.has("pair1") ? "font-bold text-green-500" : ""}`}
            >
              {"Paire 1"}
            </TableColumn>
            <TableColumn
              key={"paire2"}
              className={`text-medium ${winners.has("pair2") ? "font-bold text-green-500" : ""}`}
            >
              {"Paire 2"}
            </TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="0">
              <TableCell
                className={`${winners.has("pair1") ? "font-bold bg-green-100" : ""}`}
              >
                <span className={"text-medium"}>{pair1[0].nom}</span>
              </TableCell>
              <TableCell
                className={`${winners.has("pair2") ? "font-bold bg-green-100" : ""}`}
              >
                <span className={"text-medium"}>{pair2[0].nom}</span>
              </TableCell>
            </TableRow>
            <TableRow key="1">
              <TableCell
                className={`${winners.has("pair1") ? "font-bold bg-green-100" : ""}`}
              >
                <span className={"text-medium"}>{pair1[1].nom}</span>
              </TableCell>
              <TableCell
                className={`${winners.has("pair2") ? "font-bold bg-green-100" : ""}`}
              >
                <span className={"text-medium"}>{pair2[1].nom}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {readonly || (
          <Select
            label="Sélectionner vainqueurs"
            selectedKeys={winners}
            onSelectionChange={handleSelectionChange}
            isClearable
          >
            <SelectItem key="pair1">Paire 1</SelectItem>
            <SelectItem key="pair2">Paire 2</SelectItem>
          </Select>
        )}
      </div>
    </>
  );
};

export default CourtTable;
