import { Checkbox } from "@heroui/react";

type ParametreProps = {
  description: string;
  defaut?: boolean;
};

const ParametreBooleen = ({ description, defaut }: ParametreProps) => {
  return (
    <>
      <div className={"m-2 ml-5 mt-7"}>
        <Checkbox defaultSelected={defaut}>{description}</Checkbox>
      </div>
    </>
  );
};

export default ParametreBooleen;
