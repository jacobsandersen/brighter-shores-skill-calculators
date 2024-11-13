import { ReactNode, useState } from "react";

import { Profession } from "./lib/types/Profession";
import Layout from "./components/Layout";
import Calculator from "./components/Calculator";
import ProfessionMenu from "./components/ProfessionMenu";

export default function App(): ReactNode {
  const [profession, setProfession] = useState<Profession | null>(null)

  return (
    <Layout>
      {profession ? 
        <Calculator profession={profession} onBack={() => setProfession(null)} /> 
        : <ProfessionMenu onSelectProfession={setProfession} />}
    </Layout>
  )
}