import { NumberInput } from "@heroui/react";

type ParametreProps = {
  description: string;
  onValueChange: (value: number) => void;
  placeholder?: string;
  defaut?: number;
  unit?: string;
};

const ParametreNumerique = ({
  description,
  onValueChange,
  placeholder,
  defaut,
  unit,
}: ParametreProps) => {
  return (
    <>
      <div className={"m-2 ml-5"}>{description}</div>
      <NumberInput
        placeholder={placeholder}
        defaultValue={defaut}
        onValueChange={onValueChange}
        variant="bordered"
        minValue={1}
        maxValue={20}
        className={"w-fit m-2 ml-5"}
        size={"sm"}
        formatOptions={
          unit
            ? {
                style: "unit",
                unit: unit,
              }
            : {}
        }
      />
    </>
  );
};

export default ParametreNumerique;
