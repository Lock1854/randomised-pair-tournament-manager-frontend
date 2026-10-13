import { Button } from "@heroui/react";

const StartButton = () => {
  const handleSubmit = () => {};

  return (
    <>
      <div className={"ml-5"}>
        <div className={"flex"}>
          <Button
            className={"m-2 self-center text-2xl"}
            variant={"ghost"}
            onPress={handleSubmit}
          >
            Lancer le tournoi
          </Button>
        </div>
      </div>
    </>
  );
};

export default StartButton;
