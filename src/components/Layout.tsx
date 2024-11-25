import { PropsWithChildren, ReactNode } from "react";

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="h-full flex items-start justify-center">
      <div className="py-4 px-4 container">
        {children}
      </div>
    </div>
  )
}