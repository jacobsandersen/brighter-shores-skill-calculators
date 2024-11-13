import { PropsWithChildren, ReactNode } from "react";

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-4 w-1/2 border-solid border-2 border-primary-foreground rounded-md drop-shadow-md bg-secondary">
        {children}
      </div>
    </div>
  )
}