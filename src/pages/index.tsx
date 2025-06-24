import { ReactElement } from "react";
import SearchableLayout from "../components/searchable-layout";

export default function Home() {
  return (
    <div className="p-4 text-2xl font-bold">
      ONEBITE CINEMA
    </div>
  )
}


Home.getLayout = (page: ReactElement) => {
  return <SearchableLayout>{page}</SearchableLayout>
}