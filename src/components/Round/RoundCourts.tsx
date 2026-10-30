import type { Player } from "../../queries/type.ts";
import { type Ref, useImperativeHandle, useRef, useState } from "react";
import CourtTable, { type CourtTableHandle } from "../Table/CourtTable.tsx";

export type Pair = [Player, Player];

export type RoundCourtsHandle = {
  applyResults: () => Promise<void>;
};

type RoundCourtsProps = {
  pairs: Pair[];
  readonly: boolean;
  onHasUnselectedChange?: (hasUnselected: boolean) => void;
  ref?: Ref<RoundCourtsHandle>;
};

const RoundCourts = ({
  pairs,
  readonly,
  onHasUnselectedChange,
  ref,
}: RoundCourtsProps) => {
  const [winnersByCourt, setWinnersByCourt] = useState<
    Record<number, Set<string>>
  >({});
  const courtRefs = useRef<Record<number, CourtTableHandle | null>>({});

  useImperativeHandle(ref, () => ({
    async applyResults() {
      await Promise.all(
        Object.values(courtRefs.current).map((court) => court?.applyResults()),
      );
      setWinnersByCourt({});
      onHasUnselectedChange?.(true);
    },
  }));

  const matches: [Pair, Pair][] = [];
  for (let i = 0; i + 1 < pairs.length; i += 2) {
    matches.push([pairs[i], pairs[i + 1]]);
  }

  const handleWinnersChange = (courtNumber: number, winners: Set<string>) => {
    const next = { ...winnersByCourt, [courtNumber]: winners };
    setWinnersByCourt(next);
    if (onHasUnselectedChange) {
      onHasUnselectedChange(
        matches.some((_, i) => (next[i + 1]?.size ?? 0) === 0),
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-7">
        {matches.map(([pair1, pair2], index) => (
          <CourtTable
            key={`${pair1[0].joueureuseId}-${pair2[0].joueureuseId}`}
            courtNumber={index + 1}
            pair1={pair1}
            pair2={pair2}
            readonly={readonly}
            onWinnersChange={(w) => handleWinnersChange(index + 1, w)}
            ref={(handle) => {
              courtRefs.current[index + 1] = handle;
            }}
          />
        ))}
      </div>
    </>
  );
};

export default RoundCourts;
