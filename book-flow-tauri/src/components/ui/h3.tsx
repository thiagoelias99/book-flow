import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"

interface Props {
  children: React.ReactNode
  className?: ClassNameValue
}

export default function H3({ children, className }: Props) {
  return (
    <h3
      className={cn("text-xl font-semibold", className)}
    >{children}</h3>
  )
}
