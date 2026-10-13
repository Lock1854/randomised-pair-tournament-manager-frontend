import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";

const SideBar = () => {
  return (
    <div className="w-64 p-4 border-r border-divider bg-teal-300 h-full flex-initial">
      <Listbox className={"text-teal-900"} disableAnimation>
        <ListboxSection showDivider>
          <ListboxItem key={"app_name"} href={"/parametres"} variant={"light"}>
            <div className="text-lg">Paramètres du tournoi</div>
          </ListboxItem>
        </ListboxSection>
        <ListboxSection>
          <ListboxItem key={"round"} href={"/round"}>
            <div className="text-lg">Round en cours</div>
          </ListboxItem>
          <ListboxItem key={"results"} href={"/results"}>
            <div className="text-lg">Résultats</div>
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default SideBar;
