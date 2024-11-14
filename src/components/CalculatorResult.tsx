import { ReactNode, useEffect, useRef, useState } from "react";
import CalculatorWorker from './calculator-worker?worker'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export type CalculatorResultProps = {
  currentLevel: number,
  currentXp: number,
  targetLevel: number,
  targetXp: number,
  xpYieldPerItem: number,
  xpBoostPercent: number,
  currentKpPercent: number,
  kpPercentGainPerItem: number,
  setDebugLog: React.Dispatch<React.SetStateAction<string[]>>
}

export default function CalculatorResult(props: CalculatorResultProps): ReactNode {
  const [itemsNeeded, setItemsNeeded] = useState<number>(0)
  const [kpsRedeemed, setKpsRedeemed] = useState<number>(0)

  const workerRef = useRef<Worker | null>(null)

  const createWorker = () => workerRef.current = new CalculatorWorker()

  useEffect(() => {
    if (window.Worker) {
      createWorker()
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  useEffect(() => {
    if (!workerRef.current) return

    workerRef.current.terminate()
    workerRef.current = createWorker()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {setDebugLog, ...rest} = props
    workerRef.current.postMessage(rest)

    workerRef.current.onmessage = (event: MessageEvent<{ itemsNeeded: number, kpsRedeemed: number, debugLog: string[] }>) => {
      setItemsNeeded(event.data.itemsNeeded)
      setKpsRedeemed(event.data.kpsRedeemed)
      props.setDebugLog(event.data.debugLog)
    }
  }, [props])

  const info = [
    ["Items Needed", itemsNeeded],
    ["KPs Redeemed for XP", kpsRedeemed]
  ]

  return (
    <>
      <p className="text-lg font-semibold pb-2">Results:</p>
      <p>Assuming you maintain your XP Boost and redeem your knowledge points for XP, you will need:</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field Name</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {info.map((datum, idx) => (
            <TableRow key={`datum-${idx}`}>
              <TableCell>{datum[0]}</TableCell>
              <TableCell>{datum[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}