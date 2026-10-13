import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "../components/Layout/PageTitle.tsx";

export const Route = createFileRoute("/results")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PageTitle title={"Résultats"} />
    </>
  );
}
