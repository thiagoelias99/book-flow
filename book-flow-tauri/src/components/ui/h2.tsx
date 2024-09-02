import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  children: React.ReactNode
  className?: ClassNameValue
}

export default function H2({ children, className }: Props) {
  return (
    <h2
      className={cn("text-2xl font-semibold", className)}
    >{children}</h2>
  )
}
