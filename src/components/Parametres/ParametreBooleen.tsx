import { Checkbox } from "@heroui/react";

type ParametreProps = {
  description: string;
  onValueChange: (value: boolean) => void;
  defaut?: boolean;
};

const ParametreBooleen = ({
  description,
  onValueChange,
  defaut,
}: ParametreProps) => {
  return (
    <>
      <div className={"m-2 ml-5"}>
        <Checkbox defaultSelected={defaut} onValueChange={onValueChange}>
          {description}
        </Checkbox>
      </div>
    </>
  );
};

export default ParametreBooleen;
