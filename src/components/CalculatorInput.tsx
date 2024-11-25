import { HelpCircle } from "lucide-react";
import { ChangeEventHandler, ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type CalculatorInputProps = {
  label: string,
  tooltip?: string,
  min?: number,
  max: number,
  control: number | null,
  disabled?: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function CalculatorInput({ label, tooltip, min, max, control, disabled, onChange }: CalculatorInputProps): ReactNode {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-normal md:items-center gap-y-1 md:gap-y-0 md:gap-x-1">
      <div className="w-32 grow-0 flex gap-x-2 items-center">
        {tooltip && (
          <Popover>
            <PopoverTrigger asChild><HelpCircle className="w-4 h-4" /></PopoverTrigger>
            <PopoverContent className="max-w-64 bg-primary">
              <p>{tooltip}</p>
            </PopoverContent>
          </Popover>
        )}
        <p>{label}</p>
      </div>
      <input className="rounded-md p-2 grow" type="number" min={min} max={max} value={control ?? ''} onChange={onChange} disabled={disabled ?? false} />
    </div>
  )
}