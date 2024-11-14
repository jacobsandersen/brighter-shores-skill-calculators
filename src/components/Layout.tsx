import { PropsWithChildren, ReactNode } from "react";

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-6 w-7/12 rounded-md drop-shadow-md bg-secondary">
        {children}
      </div>
    </div>
  )
}