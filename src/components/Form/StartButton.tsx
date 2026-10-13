import { Button } from "@heroui/react";

type StartButtonProps = {
  description: string;
  onPress: () => void;
};

const StartButton = ({ description, onPress }: StartButtonProps) => {
  return (
    <>
      <div className={"ml-5"}>
        <div className={"flex"}>
          <Button
            className={"m-2 self-center text-xl"}
            variant={"flat"}
            onPress={onPress}
          >
            {description}
          </Button>
        </div>
      </div>
    </>
  );
};

export default StartButton;
