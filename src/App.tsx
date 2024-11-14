import { ReactNode, useState } from "react";

import { Profession } from "./lib/types/Profession";
import Layout from "./components/Layout";
import Calculator from "./components/Calculator";
import ProfessionMenu from "./components/ProfessionMenu";
import { Episode } from "./lib/types/Episode";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function App(): ReactNode {
  const [selection, setSelection] = useState<{ episode: Episode, profession: Profession } | null>(null)

  return (
    <TooltipProvider>
      <Layout>
        {selection ?
          <Calculator episode={selection.episode} profession={selection.profession} onBack={() => setSelection(null)} />
          : <ProfessionMenu onSelectProfession={(episode, profession) => setSelection({ episode, profession })} />}
      </Layout>
    </TooltipProvider>
  )
}