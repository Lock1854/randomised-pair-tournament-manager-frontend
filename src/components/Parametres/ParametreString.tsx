import { Button, Input } from "@heroui/react";
import { useState } from "react";

type ParametreProps = {
  description: string;
  placeholder?: string;
  onPress: (inputContent: string) => void;
};

const ParametreNumerique = ({
  description,
  placeholder,
  onPress,
}: ParametreProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    console.log(`calling ${onPress} with input value ${trimmedValue}`);
    onPress(trimmedValue);
    setInputValue("");
  };

  return (
    <>
      <div className={"ml-5"}>
        <div className={"m-2"}>{description}</div>
        <div className={"flex"}>
          <Input
            placeholder={placeholder}
            variant="bordered"
            className={"w-fit m-2"}
            size={"lg"}
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <Button
            className={"m-2 self-center text-2xl"}
            variant={"ghost"}
            onPress={handleSubmit}
          >
            ↵
          </Button>
        </div>
      </div>
    </>
  );
};

export default ParametreNumerique;
