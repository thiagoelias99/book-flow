import { PlusIcon, SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import H3 from "./ui/h3"
import { Input } from "./ui/input"
import { ClassNameValue } from "tailwind-merge"
import { cn } from "@/lib/utils"

interface Props {
  header: string
  buttonLabel: string
  buttonHandler?: () => void
  searchHandler?: (search: string) => void
  className?: ClassNameValue
}

export default function AdminAreaSectionHeader({ header, buttonLabel, className, buttonHandler, searchHandler }: Props) {

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const search = new FormData(e.currentTarget).get("search")
    searchHandler?.(search as string)
  }

  return (
    <div className={cn("w-full flex flex-row justify-between items-start", className)}>
      <H3>{header}</H3>
      <div className='flex flex-row justify-end items-center gap-4'>
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-row justify-start items-center gap-2'
        >
          <Input name='search' placeholder='search...' />
          <Button size="icon" variant="ghost"><SearchIcon size={18} /></Button>
        </form>
        <Button
          onClick={buttonHandler}
        >
          <PlusIcon />
          <p>{buttonLabel}</p>
        </Button>
      </div>
    </div>
  )
}
