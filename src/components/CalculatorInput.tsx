import { HelpCircle } from "lucide-react";
import { ChangeEventHandler, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type CalculatorInputProps = {
  label: string,
  tooltip?: string,
  min?: number,
  max: number,
  control: number | null,
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function CalculatorInput({ label, tooltip, min, max, control, onChange }: CalculatorInputProps): ReactNode {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-5/12 flex gap-x-2 items-center">
      {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild><HelpCircle size={18} /></TooltipTrigger>
            <TooltipContent className="max-w-64">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
        <p className="text-sm">{label}:</p>
      </div>
      <input className="w-7/12 rounded-md p-2" type="number" min={min} max={max} value={control ?? ''} onChange={onChange} />
    </div>
  )
}